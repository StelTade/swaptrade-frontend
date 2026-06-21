require('@testing-library/jest-dom');

const { toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

if (!global.fetch) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ token: 'test-csrf-token' }),
    })
  );
}
