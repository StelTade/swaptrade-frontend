import { renderHook, act } from '@testing-library/react';
import { useABTest } from '@/hooks/useABTest';

const EXPERIMENT = {
  key: 'test_exp',
  variants: ['control', 'variant_a'] as const,
} as const;

beforeEach(() => {
  localStorage.clear();
});

describe('useABTest', () => {
  it('returns one of the declared variants', () => {
    const { result } = renderHook(() => useABTest(EXPERIMENT));
    act(() => {}); // flush useEffect
    expect(EXPERIMENT.variants).toContain(result.current.variant);
  });

  it('isLoading is false after assignment', () => {
    const { result } = renderHook(() => useABTest(EXPERIMENT));
    act(() => {});
    expect(result.current.isLoading).toBe(false);
  });

  it('returns the same variant on repeated calls (stable assignment)', () => {
    const { result: r1 } = renderHook(() => useABTest(EXPERIMENT));
    act(() => {});
    const first = r1.current.variant;

    const { result: r2 } = renderHook(() => useABTest(EXPERIMENT));
    act(() => {});
    expect(r2.current.variant).toBe(first);
  });

  it('persists the variant in localStorage', () => {
    renderHook(() => useABTest(EXPERIMENT));
    act(() => {});
    const stored = localStorage.getItem(`swaptrade_ab_${EXPERIMENT.key}`);
    expect(EXPERIMENT.variants).toContain(stored);
  });

  it('uses stored variant if one already exists', () => {
    localStorage.setItem(`swaptrade_ab_${EXPERIMENT.key}`, 'variant_a');
    const { result } = renderHook(() => useABTest(EXPERIMENT));
    act(() => {});
    expect(result.current.variant).toBe('variant_a');
  });

  it('ignores invalid stored variant and re-assigns', () => {
    localStorage.setItem(`swaptrade_ab_${EXPERIMENT.key}`, 'invalid_variant');
    const { result } = renderHook(() => useABTest(EXPERIMENT));
    act(() => {});
    expect(EXPERIMENT.variants).toContain(result.current.variant);
  });

  it('respects weighted distribution across many users', () => {
    const weightedExp = {
      key: 'weighted_exp',
      variants: ['a', 'b'] as const,
      weights: [0.9, 0.1],
    };

    let aCount = 0;
    let bCount = 0;
    const N = 200;

    for (let i = 0; i < N; i++) {
      localStorage.setItem('swaptrade_ab_uid', `user_${i}`);
      localStorage.removeItem(`swaptrade_ab_${weightedExp.key}`);

      const { result } = renderHook(() => useABTest(weightedExp));
      act(() => {});
      if (result.current.variant === 'a') aCount++;
      else bCount++;
    }

    // With 90/10 split, expect at least 70% to be in 'a'
    expect(aCount / N).toBeGreaterThan(0.7);
    expect(bCount).toBeGreaterThan(0);
  });

  it('handles different experiments independently', () => {
    const exp1 = { key: 'exp_1', variants: ['x', 'y'] as const };
    const exp2 = { key: 'exp_2', variants: ['p', 'q'] as const };

    const { result: r1 } = renderHook(() => useABTest(exp1));
    const { result: r2 } = renderHook(() => useABTest(exp2));
    act(() => {});

    expect(['x', 'y']).toContain(r1.current.variant);
    expect(['p', 'q']).toContain(r2.current.variant);
  });
});
