import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthButtons from "./AuthButtons";

// Test suite for the AuthButtons component
describe("AuthButtons", () => {
  // Test: should call the onLoginClick function when the 'Login' button is clicked
  it("calls onLoginClick when 'Login' button is clicked", () => {
    const onLoginClick = vi.fn();

    render(
      <BrowserRouter>
        <AuthButtons onLoginClick={onLoginClick} />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });

  // Test: should render a 'Sign in' link that navigates to "/login"
  it("renders 'Sign in' link that navigates to /login", () => {
    render(
      <BrowserRouter>
        <AuthButtons onLoginClick={() => {}} />
      </BrowserRouter>
    );

    const signInLink = screen.getByRole("link", { name: /sign in/i });
    expect(signInLink).toHaveAttribute("href", "/login");
  });
});
