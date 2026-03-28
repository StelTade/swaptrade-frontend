declare module 'jest-axe' {
  export const axe: (html: Element | Document | string) => Promise<unknown>;
  export const toHaveNoViolations: unknown;
}

declare namespace jest {
  interface Matchers<R> {
    toHaveNoViolations(): R;
  }
}
