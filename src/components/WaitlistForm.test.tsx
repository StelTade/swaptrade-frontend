import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import WaitlistForm from '@/components/WaitlistForm';

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
}));

test('waitlist form is accessible', async () => {
  const originalFetch = global.fetch;
  global.fetch = jest.fn(async () => ({ ok: true, json: async () => ({ token: 't' }) })) as never;

  const { container } = render(<WaitlistForm />);
  expect(screen.getByRole('form', { name: 'Waitlist signup form' })).toBeInTheDocument();

  const results = await axe(container);
  expect(results).toHaveNoViolations();

  global.fetch = originalFetch;
});

