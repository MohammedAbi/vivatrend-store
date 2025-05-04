// Import necessary dependencies
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "../AuthContext";
import type { UserProfile } from "../../services/auth/types";

/**
 * MOCKING useLocalStorage HOOK
 * -----------------------------
 * We mock this custom hook so we can simulate saving and loading data
 * (like tokens) without touching the real localStorage.
 */
vi.mock("../../hooks/useLocalStorage", () => {
  // ✅ Use const because the reference never changes
  const store: Record<string, unknown> = {};

  function useLocalStorageMock<T>(
    key: string,
    initialValue: T
  ): [T, (value: T) => void, () => void] {
    const setValue = (value: T) => {
      store[key] = value;
    };

    const removeValue = () => {
      delete store[key];
    };

    return [(store[key] as T) ?? initialValue, setValue, removeValue];
  }

  return {
    default: useLocalStorageMock,
  };
});

/**
 * MOCKING authService
 * ---------------------
 * We fake the backend login and register functions so we don't need a real server.
 */
vi.mock("../../services/auth", () => {
  return {
    authService: {
      login: vi.fn(() =>
        Promise.resolve({
          data: {
            accessToken: "mock-token",
            name: "Jane Doe",
            email: "jane@example.com",
            bio: "Bio text",
            avatar: {
              url: "avatar.jpg",
              alt: "User avatar",
            },
            banner: {
              url: "banner.jpg",
              alt: "User banner",
            },
            venueManager: true,
          },
        })
      ),
      register: vi.fn(() => Promise.resolve()),
    },
  };
});

// Helper wrapper to include necessary providers (Auth + Router)
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);

describe("AuthContext", () => {
  // Make sure all mocks are reset before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * TEST 1: Logging in a user
   * --------------------------
   * We simulate logging in, and expect the user and token to be set.
   */
  it("logs in a user and sets token", async () => {
    // Render the hook with context
    const { result } = renderHook(() => useAuth(), { wrapper });

    // Simulate login call
    await act(async () => {
      await result.current.login({
        email: "jane@example.com",
        password: "password",
      });
    });

    // Expect user details and token to be set correctly
    // Expect user details and token to be set correctly
    expect(result.current.user).toEqual<UserProfile>({
      name: "Jane Doe",
      email: "jane@example.com",
      bio: "Bio text",
      avatar: {
        url: "avatar.jpg",
        alt: "User avatar",
      },
      banner: {
        url: "banner.jpg",
        alt: "User banner",
      },
      venueManager: true,
    });

    expect(result.current.token).toBe("mock-token");
    expect(result.current.error).toBeNull(); // No error expected
  });

  /**
   * TEST 2: Logging out the user
   * -----------------------------
   * We simulate a login followed by logout and check that user/token are cleared.
   */
  it("logs out the user", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    // First log the user in
    await act(async () => {
      await result.current.login({
        email: "jane@example.com",
        password: "password",
      });
    });

    // Then log the user out
    act(() => {
      result.current.logout();
    });

    // User and token should now be null
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });
});
