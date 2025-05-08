import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProductReviews from "../ProductReviews";

// Test with sample reviews
const reviewsFixture = [
  {
    id: "1",
    username: "Alice",
    rating: 5,
    description: "Excellent product!",
  },
  {
    id: "2",
    username: "Bob",
    rating: 3,
    description: "Good, but could be improved.",
  },
];

// Tests
describe("ProductReviews", () => {
  it("renders reviews and displays stars correctly", () => {
    render(<ProductReviews reviews={reviewsFixture} />);

    // Check if username and review description are rendered
    expect(screen.getByTestId("username-1")).toHaveTextContent("Alice");
    expect(screen.getByTestId("description-1")).toHaveTextContent(
      "Excellent product!"
    );
    expect(screen.getByTestId("username-2")).toHaveTextContent("Bob");
    expect(screen.getByTestId("description-2")).toHaveTextContent(
      "Good, but could be improved."
    );

    // Check if correct number of stars are rendered for each review
    expect(screen.getAllByTestId("star-1-0")).toHaveLength(1); // 1st star for Alice
    expect(screen.getAllByTestId("star-1-1")).toHaveLength(1); // 2nd star for Alice
    expect(screen.getAllByTestId("star-1-2")).toHaveLength(1); // 3rd star for Alice
    expect(screen.getAllByTestId("star-1-3")).toHaveLength(1); // 4th star for Alice
    expect(screen.getAllByTestId("star-1-4")).toHaveLength(1); // 5th star for Alice
    expect(screen.getAllByTestId("star-2-0")).toHaveLength(1); // 1st star for Bob
    expect(screen.getAllByTestId("star-2-1")).toHaveLength(1); // 2nd star for Bob
    expect(screen.getAllByTestId("star-2-2")).toHaveLength(1); // 3rd star for Bob
  });

  it("shows 'No reviews yet' when there are no reviews", () => {
    render(<ProductReviews reviews={[]} />);

    // Check if the 'No reviews yet' message is rendered
    expect(screen.getByTestId("no-reviews")).toHaveTextContent(
      "No reviews yet."
    );
  });
});
