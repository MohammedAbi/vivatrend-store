import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import type { UserProfile } from "../../services/auth/types";
import { toast } from "react-toastify";
import Profile from "./Profile";

// ------------------------
// Mock the toast functions
// ------------------------
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// --------------------------
// Mock useNavigate from react-router-dom
// --------------------------
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// -----------------------------
// Mock useAuth from AuthContext
// -----------------------------
const mockLogout = vi.fn();
let userOverride: UserProfile | null = null;

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => {
    if (userOverride === null) {
      return {
        user: null,
        logout: mockLogout,
        error: null,
      };
    }

    return {
      user: userOverride,
      logout: mockLogout,
      error: "Something went wrong.",
    };
  },
}));

// -----------------------------
// Profile component test suite
// -----------------------------
describe("Profile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    userOverride = null;
  });

  it("renders user info and logout button", () => {
    userOverride = {
      name: "John Doe",
      email: "john@example.com",
      bio: "Loves fashion.",
      avatar: { url: "", alt: "User avatar" },
      banner: { url: "", alt: "Banner image" },
      venueManager: true,
    };

    render(<Profile />, { wrapper: MemoryRouter });

    expect(screen.getAllByText("John Doe").length).toBeGreaterThan(0);
    expect(screen.getAllByText("john@example.com").length).toBeGreaterThan(0);
    expect(screen.getByText("Loves fashion.")).toBeInTheDocument();
    expect(screen.getByText("Venue Manager")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls logout, shows toast, and navigates on logout click", () => {
    userOverride = {
      name: "John Doe",
      email: "john@example.com",
      bio: "Loves fashion.",
      avatar: { url: "", alt: "User avatar" },
      banner: { url: "", alt: "Banner image" },
      venueManager: true,
    };

    render(<Profile />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText("Logout"));

    expect(mockLogout).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("You have been logged out.");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("displays error if present", () => {
    userOverride = {
      name: "John Doe",
      email: "john@example.com",
      bio: "Loves fashion.",
      avatar: { url: "", alt: "User avatar" },
      banner: { url: "", alt: "Banner image" },
      venueManager: true,
    };

    render(<Profile />, { wrapper: MemoryRouter });

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });

  it("redirects to login with toast if user is null", () => {
    userOverride = null;

    render(<Profile />, { wrapper: MemoryRouter });

    expect(toast.error).toHaveBeenCalledWith(
      "Please login to view your profile"
    );
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("formats underscore-separated usernames", () => {
    userOverride = {
      name: "john_doe",
      email: "john@example.com",
      bio: "Bio test.",
      avatar: { url: "", alt: "User avatar" },
      banner: { url: "", alt: "Banner image" },
      venueManager: false,
    };

    render(<Profile />, { wrapper: MemoryRouter });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
