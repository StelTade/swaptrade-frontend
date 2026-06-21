import * as crypto from 'crypto';
import * as os from 'os';
import { EventEmitter } from 'events';
import { NodeCryptoProvider } from '../crypto/NodeCryptoProvider.js';
import { NodeHttpClient } from '../net/NodeHttpClient.js';
import { PlatformFunctions } from './PlatformFunctions.js';
import { StripeError } from '../Error.js';
import { concat } from '../utils.js';
class StreamProcessingError extends StripeError {
}
/**
 * Specializes WebPlatformFunctions using APIs available in Node.js.
 */
export class NodePlatformFunctions extends PlatformFunctions {
    /** @override */
    uuid4() {
        // available in: v14.17.x+
        if (crypto.randomUUID) {
            return crypto.randomUUID();
        }
        return super.uuid4();
    }
    /** @override */
    getPlatformInfo() {
        return `${process.platform} ${os.release()} ${os.arch()}`;
    }
    /** @override */
    emitWarning(warning) {
        if (typeof process.emitWarning === 'function') {
            process.emitWarning(warning, 'Stripe');
        }
        else {
            super.emitWarning(warning);
        }
    }
    /** @override */
    getEnv() {
        return process.env;
    }
    /** @override */
    getRuntimeVersion() {
        return process.version;
    }
    getUname() {
        try {
            const parts = [os.type(), os.release(), os.arch()];
            // os.version() returns detailed kernel version, available since Node 10.7.0
            // It may not exist in older typings, so access carefully
            const version = os.version?.();
            if (version)
                parts.push(version);
            try {
                parts.push(os.hostname());
                // eslint-disable-next-line no-empty
            }
            catch (_e) { }
            return parts.join(' ');
        }
        catch {
            return null;
        }
    }
    /** @override */
    getSourceHash() {
        try {
            const uname = this.getUname();
            return uname
                ? crypto
                    .createHash('md5')
                    .update(uname)
                    .digest('hex')
                : null;
        }
        catch {
            return null;
        }
    }
    /**
     * @override
     * Secure compare, from https://github.com/freewil/scmp
     */
    secureCompare(a, b) {
        if (!a || !b) {
            throw new Error('secureCompare must receive two arguments');
        }
        // return early here if buffer lengths are not equal since timingSafeEqual
        // will throw if buffer lengths are not equal
        if (a.length !== b.length) {
            return false;
        }
        // use crypto.timingSafeEqual if available (since Node.js v6.6.0),
        // otherwise use our own scmp-internal function.
        if (crypto.timingSafeEqual) {
            const textEncoder = new TextEncoder();
            const aEncoded = textEncoder.encode(a);
            const bEncoded = textEncoder.encode(b);
            return crypto.timingSafeEqual(aEncoded, bEncoded);
        }
        return super.secureCompare(a, b);
    }
    createEmitter() {
        return new EventEmitter();
    }
    /** @override */
    tryBufferData(data) {
        if (!(data.file.data instanceof EventEmitter)) {
            return Promise.resolve(data);
        }
        const bufferArray = [];
        return new Promise((resolve, reject) => {
            data.file.data
                .on('data', (line) => {
                bufferArray.push(line);
            })
                .once('end', () => {
                // @ts-ignore
                const bufferData = Object.assign({}, data);
                bufferData.file.data = concat(bufferArray);
                resolve(bufferData);
            })
                .on('error', (err) => {
                reject(new StreamProcessingError({
                    message: 'An error occurred while attempting to process the file for upload.',
                    detail: err,
                }));
            });
        });
    }
    /** @override */
    createNodeHttpClient(agent) {
        return new NodeHttpClient(agent);
    }
    /** @override */
    createDefaultHttpClient() {
        return new NodeHttpClient();
    }
    /** @override */
    createNodeCryptoProvider() {
        return new NodeCryptoProvider();
    }
    /** @override */
    createDefaultCryptoProvider() {
        return this.createNodeCryptoProvider();
    }
}
//# sourceMappingURL=NodePlatformFunctions.js.map