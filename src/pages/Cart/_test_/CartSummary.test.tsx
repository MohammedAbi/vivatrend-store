import { render, screen } from "@testing-library/react";
import CartSummary from "../CartSummary";

describe("CartSummary", () => {
  it("renders the subtotal, discount, and total correctly", () => {
    // Render the CartSummary with example props
    render(
      <CartSummary
        subtotal={100}
        discountAmount={10}
        discountApplied={true}
        total={90}
      />
    );

    // Assert that the correct subtotal, discount, and total values are rendered
    expect(screen.getByText("Subtotal:")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();

    expect(screen.getByText("Discount (10%):")).toBeInTheDocument();
    expect(screen.getByText("-$10.00")).toBeInTheDocument();

    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("$90.00")).toBeInTheDocument();
  });

  it("does not render the discount section when discountApplied is false", () => {
    render(
      <CartSummary
        subtotal={100}
        discountAmount={0}
        discountApplied={false}
        total={100}
      />
    );

    // Assert that the discount section is not rendered
    const discountText = screen.queryByText("Discount (10%):");
    expect(discountText).not.toBeInTheDocument(); // The discount section should not be present

    // Assert that the subtotal and total are correctly rendered using aria-labels
    const subtotalValue = screen.getByLabelText("Subtotal: $100.00");
    expect(subtotalValue).toBeInTheDocument();

    const totalValue = screen.getByLabelText("Total: $100.00");
    expect(totalValue).toBeInTheDocument();
  });

  it("formats the numbers correctly with two decimal places", () => {
    // Render CartSummary with custom values to check number formatting
    render(
      <CartSummary
        subtotal={123.456}
        discountAmount={12.345}
        discountApplied={true}
        total={111.111}
      />
    );

    // Assert the numbers are correctly formatted with two decimal places
    expect(screen.getByText("$123.46")).toBeInTheDocument(); // Subtotal
    expect(screen.getByText("-$12.35")).toBeInTheDocument(); // Discount
    expect(screen.getByText("$111.11")).toBeInTheDocument(); // Total
  });
});
