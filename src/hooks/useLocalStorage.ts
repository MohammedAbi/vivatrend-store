import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValueState] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  const setValue = (newValue: T) => {
    setValueState(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  const removeValue = () => {
    setValueState(initialValue);
    localStorage.removeItem(key);
  };

  return [value, setValue, removeValue] as const;
}

export default useLocalStorage;
