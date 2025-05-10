import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Register from "../Register";

// Define prop types for the mocked components
interface RegisterFormProps {
  onLoginClick: () => void;
}

interface AuthButtonsProps {
  onLoginClick: () => void;
}

// Mock child components to isolate Register component
vi.mock("../RegisterForm", () => ({
  default: ({ onLoginClick }: RegisterFormProps) => (
    <button onClick={onLoginClick}>Mock RegisterForm Login</button>
  ),
}));

vi.mock("../AuthButtons", () => ({
  default: ({ onLoginClick }: AuthButtonsProps) => (
    <button onClick={onLoginClick}>Mock AuthButtons Login</button>
  ),
}));

vi.mock("../DividerWithText", () => ({
  default: () => <div>Divider</div>,
}));

vi.mock("../Info", () => ({
  default: () => <div>Mock Info Section</div>,
}));

// Mock navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Register", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders key elements", () => {
    render(<Register />, { wrapper: MemoryRouter });

    expect(screen.getByText("VivaTrend")).toBeInTheDocument();
    expect(screen.getByText("Mock Info Section")).toBeInTheDocument();
    expect(screen.getByText("Divider")).toBeInTheDocument();
    expect(screen.getByText(/Sign Up with Google/i)).toBeInTheDocument();
  });

  it("navigates to login on button click", () => {
    render(<Register />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText("Mock RegisterForm Login"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");

    fireEvent.click(screen.getByText("Mock AuthButtons Login"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
