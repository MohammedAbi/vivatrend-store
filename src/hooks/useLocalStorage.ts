// // src/hooks/useLocalStorage.ts
// import { useState, useEffect } from "react";

// function useLocalStorage<T>(key: string, initialValue: T) {
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     if (typeof window === "undefined") {
//       return initialValue;
//     }
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.error(`Error reading localStorage key "${key}":`, error);
//       return initialValue;
//     }
//   });

//   const setValue = (value: T | ((val: T) => T)) => {
//     try {
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       if (typeof window !== "undefined") {
//         window.localStorage.setItem(key, JSON.stringify(valueToStore));
//       }
//     } catch (error) {
//       console.error(`Error setting localStorage key "${key}":`, error);
//     }
//   };

//   const removeValue = () => {
//     try {
//       setStoredValue(initialValue);
//       if (typeof window !== "undefined") {
//         window.localStorage.removeItem(key);
//       }
//     } catch (error) {
//       console.error(`Error removing localStorage key "${key}":`, error);
//     }
//   };

//   // Sync between tabs
//   useEffect(() => {
//     const handleStorageChange = (e: StorageEvent) => {
//       if (e.key === key) {
//         try {
//           setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
//         } catch (error) {
//           console.error(
//             `Error parsing updated localStorage value for key "${key}":`,
//             error
//           );
//         }
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, [key, initialValue]);

//   return [storedValue, setValue, removeValue] as const;
// }

// export default useLocalStorage;
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
