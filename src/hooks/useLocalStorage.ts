import { useEffect, useState } from "react";

interface useLocalStorageItem {
  key: string;
  value: string;
}

export default function useLocalStorage({ key, value }: useLocalStorageItem) {
  const [storedValue, setStoredValue] = useState<string>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : value;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
