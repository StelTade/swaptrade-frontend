"use client";

import { useRef, useState } from 'react';
import QRCode from 'qrcode.react';

interface QRCodeComponentProps {
  url: string;
  referralCode?: string | null;
  size?: number;
  onDownload?: () => void;
}

export default function QRCodeComponent({ 
  url, 
  referralCode = 'referral-code',
  size = 256,
  onDownload,
}: QRCodeComponentProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [downloaded, setDownloaded] = useState(false);

  const downloadQRCode = () => {
    const element = qrRef.current?.querySelector('canvas');
    if (!element) return;

    element.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `swaptrade-referral-${referralCode}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      if (onDownload) {
        onDownload();
      }

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={qrRef}
        className="p-4 bg-white rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
        aria-label="QR code for referral link"
      >
        <QRCode
          value={url}
          size={size}
          level="H"
          includeMargin
          renderAs="canvas"
          imageSettings={{
            src: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2245%22 fill=%22%230f172a%22/%3E%3C/svg%3E',
            x: undefined,
            y: undefined,
            height: 0,
            width: 0,
          }}
        />
      </div>
      <button
        onClick={downloadQRCode}
        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium transition-colors"
        aria-label="Download QR code"
      >
        {downloaded ? '✓ Downloaded!' : 'Download QR Code'}
      </button>
    </div>
  );
}
