import { act, renderHook } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { useReducedMotion } from './useReducedMotion';

it('responds to changed motion preferences and cleans up its subscription', () => {
  let matches = false;
  const listeners = new Set<() => void>();
  vi.stubGlobal('matchMedia', () => ({
    get matches() { return matches; },
    addEventListener: (_: string, callback: () => void) => listeners.add(callback),
    removeEventListener: (_: string, callback: () => void) => listeners.delete(callback),
  }));
  const { result, unmount } = renderHook(() => useReducedMotion());
  expect(result.current).toBe(false);
  act(() => {
    matches = true;
    listeners.forEach((notify) => notify());
  });
  expect(result.current).toBe(true);
  unmount();
  expect(listeners.size).toBe(0);
  vi.unstubAllGlobals();
});
