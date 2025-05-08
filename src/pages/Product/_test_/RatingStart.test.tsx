import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RatingStars from "../RatingStars";

describe("RatingStars", () => {
  it("renders correct number of filled and empty stars", () => {
    render(<RatingStars rating={3.6} reviewsCount={45} />);

    const filledStars = screen.getAllByTestId("filled-star");
    const emptyStars = screen.getAllByTestId("empty-star");

    expect(filledStars).toHaveLength(4); // rounded from 3.6
    expect(emptyStars).toHaveLength(1);
  });

  it("renders the correct reviews count", () => {
    render(<RatingStars rating={4} reviewsCount={120} />);
    expect(screen.getByText("(120 reviews)")).toBeInTheDocument();
  });
});
