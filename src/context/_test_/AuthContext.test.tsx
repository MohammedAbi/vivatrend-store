import React from "react";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "../AuthContext";
import { authService } from "../../services/auth";
import { AuthResponseData } from "../../services/auth"; // Adjust the import path as necessary
import type { MockedFunction } from "vitest";

// Mock authService
vi.mock("../../services/auth", () => ({
  authService: {
    login: vi.fn(),
    register: vi.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Provide AuthContext with Router
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("logs in and sets user and token", async () => {
    const credentials = {
      email: "first.last@stud.noroff.no",
      password: "UzI1NiIsInR5cCI",
    };

    const mockUser: AuthResponseData = {
      name: "username",
      email: "first.last@stud.noroff.no",
      avatar: {
        url: "https://img.service.com/avatar.jpg",
        alt: "My avatar alt text",
      },
      banner: {
        url: "https://img.service.com/banner.jpg",
        alt: "My banner alt text",
      },
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....",
      venueManager: true,
    };

    (
      authService.login as MockedFunction<typeof authService.login>
    ).mockResolvedValue({
      data: mockUser,
      meta: {},
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login(credentials);
    });

    const { user, token } = result.current;

    // Type guard: Check if user is not null and is of type AuthResponseData
    if (user && (user as AuthResponseData)) {
      const { accessToken, ...expectedUser } = mockUser;
      const { accessToken: receivedAccessToken, ...receivedUser } =
        user as AuthResponseData;

      // Assert user is set correctly (ignoring accessToken)
      expect(receivedUser).toEqual(expectedUser);
      expect(token).toBe(mockUser.accessToken);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    } else {
      throw new Error(
        "User is null or not of type AuthResponseData, cannot test login flow."
      );
    }
  });

  it("shows error on login failure", async () => {
    (
      authService.login as MockedFunction<typeof authService.login>
    ).mockRejectedValue(new Error("Invalid credentials"));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      try {
        await result.current.login({
          email: "fail@test.com",
          password: "wrong",
        });
      } catch {}
    });

    expect(result.current.error).toBe("Invalid credentials");
  });

  it("registers and navigates to login", async () => {
    const registerData = {
      name: "username",
      email: "first.last@stud.noroff.no",
      password: "UzI1NiIsInR5cCI",
      bio: "This is my profile bio",
      avatar: {
        url: "https://img.service.com/avatar.jpg",
        alt: "My avatar alt text",
      },
      banner: {
        url: "https://img.service.com/banner.jpg",
        alt: "My banner alt text",
      },
      venueManager: true,
    };

    (
      authService.register as MockedFunction<typeof authService.register>
    ).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.register(registerData);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("throws if useAuth is used outside provider", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderHook(() => useAuth())).toThrowError(
      "useAuth must be used within an AuthProvider"
    );

    errorSpy.mockRestore();
  });
});
