import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn = ((...args: any[]) => {
    if (timer) clearTimeout(timer);
    setTimer(setTimeout(() => callback(...args), delay));
  }) as T;

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  return debouncedFn;
}
