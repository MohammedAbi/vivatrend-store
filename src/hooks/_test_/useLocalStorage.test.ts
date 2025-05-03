import { renderHook } from "@testing-library/react";
import useLocalStorage from "../useLocalStorage";
import { act } from "react";

describe("useLocalStorage", () => {
  const key = "test-key";

  beforeEach(() => {
    localStorage.clear();
  });

  // test should return the default value if localStorage has no value
  it("should return initial value if localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage(key, "default"));

    const [value] = result.current;

    expect(value).toBe("default");
  });

  // Test should return value from localStorage if it exists
  it("should read from localStorage if value exists", () => {
    localStorage.setItem(key, JSON.stringify("stored-value"));

    const { result } = renderHook(() => useLocalStorage(key, "default"));
    const [value] = result.current;

    expect(value).toBe("stored-value");
  });

  // SetValue should update both localStorage and hook state
  it("should update localStorage and state when setValue is called", () => {
    const { result } = renderHook(() => useLocalStorage(key, "initial"));

    act(() => {
      const [, setValue] = result.current;
      setValue("new-value");
    });
    const [updatedValue] = result.current;

    expect(updatedValue).toBe("new-value");
    expect(localStorage.getItem(key)).toBe(JSON.stringify("new-value"));
  });

  // removeValue should clear localStorage and reset the state
  it("should remove from localStorage and reset state when removeValue is called", () => {
    const { result } = renderHook(() => useLocalStorage(key, "initial"));
    act(() => {
      const [, setValue] = result.current;
      setValue("temp-value");
    });
    act(() => {
      const [, , removeValue] = result.current;
      removeValue();
    });

    const [resetValue] = result.current;
    expect(resetValue).toBe("initial");
    expect(localStorage.getItem(key)).toBeNull();
  });
});
