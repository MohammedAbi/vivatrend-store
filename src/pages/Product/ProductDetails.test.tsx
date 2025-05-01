import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProductDetails from "./ProductDetails";

// Mock toast.success
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
  },
}));

import { toast } from "react-toastify"; // Import after mocking!

describe("ProductDetails", () => {
  const mockOnAddToCart = vi.fn();

  const defaultProps = {
    title: "Test Product",
    description: "This is a test product description.",
    price: 100,
    discountedPrice: 80,
    rating: 4.5,
    reviewsCount: 10,
    tags: ["tag1", "tag2"],
    onAddToCart: mockOnAddToCart,
  };

  beforeEach(() => {
    vi.clearAllMocks(); // Reset mocks before each test
  });

  it("renders all the product details correctly", () => {
    render(<ProductDetails {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(screen.getByText(/tag1, tag2/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });

  it("calls onAddToCart and shows a toast when 'Add to Cart' button is clicked", () => {
    render(<ProductDetails {...defaultProps} />);

    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith(
      `${defaultProps.title} added to cart!`,
      expect.objectContaining({
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    );
  });
});
