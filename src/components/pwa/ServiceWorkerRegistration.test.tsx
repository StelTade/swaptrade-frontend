import { render } from '@testing-library/react';
import ServiceWorkerRegistration from './ServiceWorkerRegistration';

const mockRegister = jest.fn(() => Promise.resolve({} as ServiceWorkerRegistration));

beforeEach(() => {
  mockRegister.mockClear();
  Object.defineProperty(navigator, 'serviceWorker', {
    value: { register: mockRegister },
    configurable: true,
  });
});

test('registers service worker with correct path and scope', async () => {
  render(<ServiceWorkerRegistration />);

  // Flush microtasks so the useEffect fires
  await Promise.resolve();

  expect(mockRegister).toHaveBeenCalledWith('/sw.js', { scope: '/' });
  expect(mockRegister).toHaveBeenCalledTimes(1);
});

test('renders nothing visible', () => {
  const { container } = render(<ServiceWorkerRegistration />);
  expect(container.firstChild).toBeNull();
});

test('does not throw when serviceWorker is unavailable', async () => {
  Object.defineProperty(navigator, 'serviceWorker', {
    value: undefined,
    configurable: true,
  });

  expect(() => render(<ServiceWorkerRegistration />)).not.toThrow();
});
