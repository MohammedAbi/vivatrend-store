import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import CartItem from "../CartItem";

// Mock functions for the callbacks
const mockOnRemove = vi.fn();
const mockOnUpdateQuantity = vi.fn();

const mockItem = {
  id: "1",
  title: "Product 1",
  discountedPrice: 100,
  image: { url: "image.jpg", alt: "Product 1" },
  quantity: 1,
};

describe("CartItem", () => {
  it("should display product details", () => {
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    // Check if the title, image, and price are rendered
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByAltText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  it("should call onUpdateQuantity with correct arguments when increase button is clicked", () => {
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    // Click the increase button
    fireEvent.click(screen.getByLabelText(/increase quantity/i));

    // Check if the onUpdateQuantity was called with the correct arguments
    expect(mockOnUpdateQuantity).toHaveBeenCalledWith("1", 2);
  });

  it("should call onUpdateQuantity with correct arguments when decrease button is clicked", async () => {
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    // Click the decrease button
    fireEvent.click(screen.getByLabelText(/decrease quantity/i));

    // Check if the onUpdateQuantity was called with the correct arguments
    expect(mockOnUpdateQuantity).toHaveBeenCalledWith("1", 0);
  });

  it("should call onRemove when remove button is clicked", () => {
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    // Click the remove button
    fireEvent.click(screen.getByLabelText(/remove item/i));

    // Check if the onRemove function was called with the correct arguments
    expect(mockOnRemove).toHaveBeenCalledWith("1");
  });
});
