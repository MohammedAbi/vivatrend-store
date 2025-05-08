import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import ProductPage from "../ProductPage";
import { MemoryRouter } from "react-router-dom";

// ✅ Mock SpinnerDotted
vi.mock("spinners-react", () => ({
  SpinnerDotted: () => <div role="status">Loading...</div>,
}));

// Mock useParams
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
  };
});

// Mock useProducts
const mockUseProducts = vi.fn();
vi.mock("../../../context/product/ProductsContext", () => ({
  useProducts: () => mockUseProducts(),
}));

// Mock useCart
const addToCartMock = vi.fn();
vi.mock("../../../hooks/useCart", () => ({
  useCart: () => ({
    addToCart: addToCartMock,
  }),
}));

// Product fixture
const productFixture = {
  id: "1",
  title: "Test Product",
  description: "A cool product",
  price: 100,
  discountedPrice: 80,
  rating: 4,
  reviews: [
    {
      id: "r1",
      username: "Alice",
      rating: 5,
      description: "Great!",
    },
  ],
  tags: ["tech", "cool"],
  image: {
    url: "/image.jpg",
    alt: "Product image",
  },
};

// Tests
describe("ProductPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders product details and handles add to cart", () => {
    mockUseProducts.mockReturnValue({
      products: [productFixture],
      loading: false,
      error: null,
    });

    render(<ProductPage />, { wrapper: MemoryRouter });

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("A cool product")).toBeInTheDocument();
    expect(screen.getByText("$80.00")).toBeInTheDocument();
    expect(screen.getByText("Great!")).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);
    expect(addToCartMock).toHaveBeenCalledWith(productFixture);
  });

  it("shows loading spinner", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      loading: true,
      error: null,
    });

    render(<ProductPage />, { wrapper: MemoryRouter });

    expect(screen.getByRole("status")).toBeInTheDocument(); // Role is mocked div
  });

  it("shows error message", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      loading: false,
      error: "Something went wrong",
    });

    render(<ProductPage />, { wrapper: MemoryRouter });

    expect(screen.getByText(/error loading product/i)).toBeInTheDocument();
  });

  it("shows product not found", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      loading: false,
      error: null,
    });

    render(<ProductPage />, { wrapper: MemoryRouter });

    expect(screen.getByText(/product not found/i)).toBeInTheDocument();
  });
});
