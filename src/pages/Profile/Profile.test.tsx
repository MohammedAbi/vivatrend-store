// Imports
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// ✅ Mock the toast.error function from react-toastify
// This prevents actual toasts from showing and allows us to verify if it was called
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

// ✅ Mock useNavigate from react-router-dom
// This allows us to intercept navigation calls without changing the URL
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// ✅ Mock useAuth from AuthContext
// We allow overriding the user to simulate logged-in and logged-out states
const mockLogout = vi.fn();
let userOverride: any = undefined;
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => {
    if (userOverride === null) {
      // Simulate unauthenticated state
      return {
        user: null,
        logout: mockLogout,
        error: null,
      };
    }

    // Default authenticated user mock
    return {
      user: {
        name: "john_doe",
        email: "john@example.com",
        bio: "Loves fashion.",
        avatar: { url: "", alt: "User avatar" },
        banner: { url: "", alt: "Banner image" },
        venueManager: true,
      },
      logout: mockLogout,
      error: "Something went wrong.",
    };
  },
}));

// ✅ Import toast after mocks are set up
import { toast } from "react-toastify";
import Profile from "./Profile";

// ✅ Profile component test suite
describe("Profile", () => {
  beforeEach(() => {
    // Reset mocks and override state before each test
    vi.clearAllMocks();
    userOverride = undefined;
  });

  it("renders user info and logout button", () => {
    render(<Profile />, { wrapper: MemoryRouter });

    expect(screen.getByText("John Doe")).toBeInTheDocument(); // formatted name
    expect(screen.getAllByText("john@example.com").length).toBeGreaterThan(0); // multiple occurrences
    expect(screen.getByText("Loves fashion.")).toBeInTheDocument();
    expect(screen.getByText("Venue Manager")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls logout and navigates on logout click", () => {
    render(<Profile />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText("Logout"));
    expect(mockLogout).toHaveBeenCalled(); // confirms logout function was called
    expect(mockNavigate).toHaveBeenCalledWith("/"); // confirms redirect to home
  });

  it("displays error if present", () => {
    render(<Profile />, { wrapper: MemoryRouter });

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument(); // error message from context
  });

  it("redirects to login with toast if user is null", () => {
    // Simulate unauthenticated user
    userOverride = null;

    render(<Profile />, { wrapper: MemoryRouter });

    expect(toast.error).toHaveBeenCalledWith(
      "Please login to view your profile"
    );
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
