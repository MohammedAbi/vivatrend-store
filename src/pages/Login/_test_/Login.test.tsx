// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { vi } from "vitest";
// import { BrowserRouter } from "react-router-dom";
// import Login from "../Login";
// import { useAuth } from "../../../context";

// // Mock the useAuth hook for the test
// vi.mock("../../../context", () => ({
//   useAuth: vi.fn(),
// }));

// describe("Login Component", () => {
//   const mockLogin = vi.fn();

//   beforeEach(() => {
//     // Set up mock return value for useAuth
//     (useAuth as vi.Mock).mockReturnValue({
//       login: mockLogin,
//       isLoading: false,
//       error: null,
//     });
//   });

//   test("should render login form and submit credentials", async () => {
//     render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );

//     const emailInput = screen.getByLabelText(/email/i);
//     const passwordInput = screen.getByLabelText(/password/i);
//     const submitButton = screen.getByRole("button", { name: /login/i });

//     // Simulate user input
//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "password123" } });
//     fireEvent.click(submitButton);

//     // Check that login was called with the correct credentials
//     await waitFor(() => {
//       expect(mockLogin).toHaveBeenCalledWith({
//         email: "test@example.com",
//         password: "password123",
//       });
//     });
//   });

//   test("should display error message if login fails", async () => {
//     const errorMessage = "Invalid credentials";

//     // Mock a failed login scenario
//     (useAuth as vi.Mock).mockReturnValueOnce({
//       login: vi.fn(() => Promise.reject(new Error(errorMessage))),
//       isLoading: false,
//       error: errorMessage,
//     });

//     render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );

//     const emailInput = screen.getByLabelText(/email/i);
//     const passwordInput = screen.getByLabelText(/password/i);
//     const submitButton = screen.getByRole("button", { name: /login/i });

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "password123" } });
//     fireEvent.click(submitButton);

//     // Check for the error message in the document
//     await waitFor(() => {
//       expect(screen.getByText(errorMessage)).toBeInTheDocument();
//     });
//   });
// });
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";
import { useAuth } from "../../../context";

// Mock the useAuth hook for the test
vi.mock("../../../context", () => ({
  useAuth: vi.fn(),
}));

// Use a properly typed version of the mock
const mockedUseAuth = useAuth as unknown as ReturnType<typeof vi.fn>;

describe("Login Component", () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    mockedUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
    });
  });

  test("should render login form and submit credentials", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  test("should display error message if login fails", async () => {
    const errorMessage = "Invalid credentials";

    mockedUseAuth.mockReturnValueOnce({
      login: vi.fn().mockRejectedValue(new Error(errorMessage)),
      isLoading: false,
      error: errorMessage,
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
