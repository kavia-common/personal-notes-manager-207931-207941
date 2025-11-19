import { useEffect } from 'react';

// PUBLIC_INTERFACE
export function useDebouncedEffect(effect, deps, delay = 400) {
  /**
   * Runs effect after delay when dependencies change; cleans up pending timer if deps change again.
   */
  useEffect(() => {
    const handler = setTimeout(() => {
      effect();
    }, delay);
    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(deps || []), delay]);
}
