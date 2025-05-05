import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "../LoginForm";

// Group of tests for the LoginForm component
describe("LoginForm", () => {
  // Test: Check if the form renders the email, password fields and all buttons
  it("renders email and password fields and buttons", () => {
    render(
      <LoginForm
        onSignUpClick={() => {}}
        onSubmit={() => {}}
        isLoading={false}
        error={null}
      />
    );

    // Check basic elements are present on the page
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign In with Google/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign up/i })
    ).toBeInTheDocument();
  });

  // Test: Simulate filling out the form and submitting it
  it("calls onsubmit when form is filled and submitted", () => {
    const onsubmitMock = vi.fn(); // mock submit function

    render(
      <LoginForm
        onSubmit={onsubmitMock}
        onSignUpClick={() => {}}
        isLoading={false}
        error={null}
      />
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "student@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "12345678" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Assert that onSubmit was called with the correct values
    expect(onsubmitMock).toHaveBeenCalledWith(
      "student@example.com",
      "12345678"
    );
  });

  // Test: Check if the sign-up callback is triggered when clicking the register button
  it("calls onSignUpClick when 'Register' button is clicked", () => {
    const onSignUpClickMock = vi.fn(); // mock sign-up click handler

    render(
      <LoginForm
        onSubmit={() => {}}
        onSignUpClick={onSignUpClickMock}
        isLoading={false}
        error={null}
      />
    );

    // Simulate clicking the Register button
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    // Assert that onSignUpClick was called
    expect(onSignUpClickMock).toHaveBeenCalled();
  });

  // Test: Ensure the login button is disabled when loading
  it("disables login button when loading", () => {
    render(
      <LoginForm
        onSubmit={() => {}}
        onSignUpClick={() => {}}
        isLoading={true}
        error={null}
      />
    );

    // Get the login button and verify it is disabled
    const loginButton = screen.getByRole("button", { name: /logging in/i });
    expect(loginButton).toBeDisabled();
  });

  // Test: Check that an error message is shown when the `error` prop is passed
  it("shows error when error prop is passed", () => {
    render(
      <LoginForm
        onSubmit={() => {}}
        onSignUpClick={() => {}}
        error="Invalid credentials"
      />
    );

    // Assert that the error text is rendered
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
