'use client';

import { useEffect, useState } from 'react';

/**
 * useScroll
 * - returns `true` once the scrollY threshold is reached
 * - throttled to fire max once per `delay` ms
 */
export function useScroll(threshold = 90, delay = 100) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let timer: number | null = null;

    const handler = () => {
      if (timer) return;
      timer = window.setTimeout(() => {
        setScrolled(window.scrollY >= threshold);
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      }, delay);
    };

    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [threshold, delay]);

  return scrolled;
}
