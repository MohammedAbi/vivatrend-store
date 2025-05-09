// RegisterForm.test.tsx

// Import test utilities from Vitest and React Testing Library
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterForm from "../RegisterForm";

// ✅ Mock the useAuth hook so we can isolate the RegisterForm component's behavior
vi.mock("../../../context", () => ({
  useAuth: () => ({
    register: vi.fn(),
    isLoading: false,
    error: null,
    clearError: vi.fn(),
  }),
}));

// ✅ Test suite for the RegisterForm component
describe("RegisterForm", () => {
  // ✅ Test 1: Check if all input fields and the submit button are rendered
  it("renders all input fields and submit button", () => {
    render(
      <MemoryRouter>
        <RegisterForm onLoginClick={() => {}} />
      </MemoryRouter>
    );

    // Check for the presence of input fields
    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/your.name@stud.noroff.no/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Password (min. 8 characters)")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/tell us about yourself/i)
    ).toBeInTheDocument();

    // Check for the presence of the submit button
    expect(
      screen.getByRole("button", { name: /create account/i })
    ).toBeInTheDocument();
  });

  // ✅ Test 2: Check if the onLoginClick callback is triggered when login link is clicked
  it("calls onLoginClick when login link is clicked", () => {
    const onLoginClick = vi.fn(); // Create a mock function

    render(
      <MemoryRouter>
        <RegisterForm onLoginClick={onLoginClick} />
      </MemoryRouter>
    );

    // Simulate clicking the login link
    const loginButton = screen.getByRole("button", { name: /login here/i });
    fireEvent.click(loginButton);

    // Assert the mock function was called
    expect(onLoginClick).toHaveBeenCalled();
  });

  // ✅ Test 3: Ensure password mismatch shows a validation error
  it("shows validation error if passwords do not match", () => {
    render(
      <MemoryRouter>
        <RegisterForm onLoginClick={() => {}} />
      </MemoryRouter>
    );

    // Fill out form fields with valid inputs except mismatched passwords
    fireEvent.change(screen.getByPlaceholderText(/first name/i), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByPlaceholderText(/your.name@stud.noroff.no/i), {
      target: { value: "test@stud.noroff.no" },
    });
    fireEvent.change(screen.getByPlaceholderText(/^password/i), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: "87654321" },
    });

    // Accept terms and conditions
    fireEvent.click(
      screen.getByRole("checkbox", { name: /i agree to the terms/i })
    );

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    // Check for the validation error message
    expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
  });
});
