import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import WaitlistForm from '@/components/WaitlistForm';

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
}));

describe('WaitlistForm', () => {
  it('renders the form correctly', () => {
    const { container } = render(<WaitlistForm />);
    expect(container.querySelector('input[type="email"]')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<WaitlistForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});