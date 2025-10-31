import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 300) {
  const [val, setVal] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setVal(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return val;
}
