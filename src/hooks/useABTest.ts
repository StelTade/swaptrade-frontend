'use client';

import { useState, useEffect } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Experiment<V extends string = string> {
  /** Unique experiment key (used for storage & analytics). */
  key: string;
  /** Ordered list of variant names. Must have ≥ 2 entries. */
  variants: readonly [V, ...V[]];
  /**
   * Weights for each variant (must sum to 1). Defaults to equal distribution.
   * Length must match `variants`.
   */
  weights?: number[];
}

// ---------------------------------------------------------------------------
// Deterministic variant assignment
// ---------------------------------------------------------------------------

/**
 * Simple hash → integer to deterministically bucket a user into a variant.
 * Uses the experiment key + a stable user ID (from localStorage or generated).
 */
function hashToIndex(seed: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash % length;
}

function weightedIndex(weights: number[], random: number): number {
  let cumulative = 0;
  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (random < cumulative) return i;
  }
  return weights.length - 1;
}

const STORAGE_KEY_PREFIX = 'swaptrade_ab_';
const USER_ID_KEY = 'swaptrade_ab_uid';

function getOrCreateUserId(): string {
  if (typeof window === 'undefined') return 'ssr';
  let uid = localStorage.getItem(USER_ID_KEY);
  if (!uid) {
    uid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(USER_ID_KEY, uid);
  }
  return uid;
}

function assignVariant<V extends string>(experiment: Experiment<V>): V {
  const uid = getOrCreateUserId();
  const seed = `${experiment.key}:${uid}`;

  if (experiment.weights) {
    // Weighted: convert hash to [0,1) range then bucket
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    const normalized = hash / 0xffffffff;
    const idx = weightedIndex(experiment.weights, normalized);
    return experiment.variants[idx];
  }

  const idx = hashToIndex(seed, experiment.variants.length);
  return experiment.variants[idx];
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

interface UseABTestResult<V extends string> {
  variant: V | null;
  /** true while the variant hasn't been determined yet (SSR / first render) */
  isLoading: boolean;
}

/**
 * Assigns the current user to a variant for the given experiment.
 *
 * Assignments are deterministic and persisted in localStorage so the same
 * user always sees the same variant. Experiments can be paused by removing
 * them from the running set without a code deploy — just stop rendering
 * whichever variant corresponds to the paused state.
 *
 * @example
 * const { variant } = useABTest({ key: 'hero_headline', variants: ['control', 'variant_a'] });
 */
export function useABTest<V extends string>(
  experiment: Experiment<V>
): UseABTestResult<V> {
  const [variant, setVariant] = useState<V | null>(null);

  useEffect(() => {
    const storageKey = `${STORAGE_KEY_PREFIX}${experiment.key}`;
    const stored = localStorage.getItem(storageKey) as V | null;

    if (stored && (experiment.variants as readonly string[]).includes(stored)) {
      setVariant(stored);
      return;
    }

    const assigned = assignVariant(experiment);
    localStorage.setItem(storageKey, assigned);
    setVariant(assigned);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiment.key]);

  return { variant, isLoading: variant === null };
}
