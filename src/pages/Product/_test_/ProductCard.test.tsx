import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../ProductCard";

// Declare navigate mock
const mockNavigate = vi.fn();

// Mock useNavigate to return mockNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ProductCard", () => {
  const product = {
    id: "123",
    title: "Test Product",
    description: "Test Description",
    price: 100,
    discountedPrice: 80,
    rating: 4,
    reviews: [
      { id: "r1", username: "user1", rating: 4, description: "Great!" },
      { id: "r2", username: "user2", rating: 4, description: "Nice product" },
      {
        id: "r3",
        username: "user3",
        rating: 4,
        description: "Worth the price",
      },
      { id: "r4", username: "user4", rating: 4, description: "Recommended" },
    ],
    tags: ["tag1", "tag2"],
    image: {
      url: "/test.jpg",
      alt: "Test Image",
    },
  };

  it("renders product details", () => {
    render(<ProductCard product={product} />, { wrapper: MemoryRouter });

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("$80.00")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
    expect(screen.getByText("★★★★☆")).toBeInTheDocument();
    expect(screen.getByText("4 reviews")).toBeInTheDocument();
    expect(screen.getByText(/tag1, tag2/i)).toBeInTheDocument();
  });

  it("navigates to product detail on button click", () => {
    render(<ProductCard product={product} />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByRole("button", { name: /shop now/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/products/123");
  });
});
