import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import AnalyticsProvider, { useAnalytics } from './AnalyticsProvider';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function TestConsumer() {
  const { consentGiven, giveConsent, revokeConsent, track } = useAnalytics();
  return (
    <div>
      <span data-testid="consent">{consentGiven ? 'yes' : 'no'}</span>
      <button onClick={giveConsent}>Accept</button>
      <button onClick={revokeConsent}>Decline</button>
      <button onClick={() => track('cta_click', { label: 'test' })}>Track</button>
    </div>
  );
}

async function renderWithProvider(cookieValue?: string) {
  if (cookieValue !== undefined) {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: cookieValue,
    });
  }
  let result: ReturnType<typeof render>;
  await act(async () => {
    result = render(
      <AnalyticsProvider>
        <TestConsumer />
      </AnalyticsProvider>
    );
  });
  return result!;
}

beforeEach(() => {
  Object.defineProperty(document, 'cookie', { writable: true, value: '' });
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('AnalyticsProvider', () => {
  it('shows consent banner when no cookie is set', async () => {
    await renderWithProvider('');
    expect(screen.getByRole('region', { name: /cookie consent/i })).toBeInTheDocument();
  });

  it('hides consent banner when consent cookie is already set', async () => {
    await renderWithProvider('swaptrade_analytics_consent=true');
    expect(screen.queryByRole('region', { name: /cookie consent/i })).not.toBeInTheDocument();
  });

  it('consentGiven is false by default', async () => {
    await renderWithProvider('');
    expect(screen.getByTestId('consent').textContent).toBe('no');
  });

  it('sets consentGiven to true when Accept is clicked', async () => {
    await renderWithProvider('');
    fireEvent.click(screen.getByRole('button', { name: /accept/i }));
    expect(screen.getByTestId('consent').textContent).toBe('yes');
  });

  it('hides banner after accepting', async () => {
    await renderWithProvider('');
    fireEvent.click(screen.getByRole('button', { name: /accept/i }));
    await waitFor(() => {
      expect(screen.queryByRole('region', { name: /cookie consent/i })).not.toBeInTheDocument();
    });
  });

  it('hides banner after declining', async () => {
    await renderWithProvider('');
    fireEvent.click(screen.getByRole('button', { name: /decline/i }));
    await waitFor(() => {
      expect(screen.queryByRole('region', { name: /cookie consent/i })).not.toBeInTheDocument();
    });
  });

  it('consentGiven stays false after declining', async () => {
    await renderWithProvider('');
    fireEvent.click(screen.getByRole('button', { name: /decline/i }));
    expect(screen.getByTestId('consent').textContent).toBe('no');
  });

  it('track does not throw before or after consent', async () => {
    await renderWithProvider('');
    expect(() => fireEvent.click(screen.getByRole('button', { name: /track/i }))).not.toThrow();
    fireEvent.click(screen.getByRole('button', { name: /accept/i }));
    expect(() => fireEvent.click(screen.getByRole('button', { name: /track/i }))).not.toThrow();
  });

  it('has no accessibility violations', async () => {
    const { container } = await renderWithProvider('');
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('consent persists in cookie after accepting', async () => {
    await renderWithProvider('');
    fireEvent.click(screen.getByRole('button', { name: /accept/i }));
    expect(document.cookie).toContain('swaptrade_analytics_consent=true');
  });
});
