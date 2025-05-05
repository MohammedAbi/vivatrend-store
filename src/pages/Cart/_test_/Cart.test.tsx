import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../Cart";
import { vi } from "vitest";
import { toast } from "react-toastify";

// ✅ All mocks inline.
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

vi.mock("../../../hooks/useCart", () => ({
  useCart: () => ({
    cartItems: [
      {
        id: "1",
        title: "Mock Product",
        description: "Test",
        price: 100,
        discountedPrice: 90,
        image: { url: "/img.jpg", alt: "mock" },
        rating: 5,
        tags: [],
        reviews: [],
        quantity: 1,
      },
    ],
    isCartOpen: true,
    toggleCart: vi.fn(),
    removeFromCart: vi.fn(),
    updateQuantity: vi.fn(),
    getCartItemCount: () => 1,
    getCartTotal: () => 90,
    clearCart: vi.fn(),
  }),
}));

vi.mock("../../../context", () => ({
  useAuth: () => ({
    user: null,
  }),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Stub child components
vi.mock("../CouponInput", () => ({
  default: () => <div data-testid="coupon-input" />,
}));
vi.mock("../CartSummary", () => ({
  default: () => <div data-testid="cart-summary" />,
}));
vi.mock("../CartItem", () => ({
  default: () => <li data-testid="cart-item" />,
}));

describe("Cart", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders cart with items and UI components", () => {
    render(<Cart />);

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByTestId("cart-item")).toBeInTheDocument();
    expect(screen.getByTestId("coupon-input")).toBeInTheDocument();
    expect(screen.getByTestId("cart-summary")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /proceed to checkout/i })
    ).toBeInTheDocument();
  });

  it("redirects to login if not authenticated when checking out", () => {
    render(<Cart />);

    fireEvent.click(
      screen.getByRole("button", { name: /proceed to checkout/i })
    );
    expect(toast.error).toHaveBeenCalledWith(
      "Please login to proceed to checkout"
    );
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
