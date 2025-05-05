import { render, screen, fireEvent } from "@testing-library/react";
import CouponInput from "../CouponInput";
import { vi } from "vitest";

describe("CouponInput", () => {
  // Mocks for functions passed as props
  const mockApply = vi.fn();
  const mockRemove = vi.fn();
  const mockCodeChange = vi.fn();

  // Reset mocks after each test case
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with initial props", () => {
    // Render the component with props
    render(
      <CouponInput
        couponCode=""
        discountApplied={false}
        invalidCoupon={false}
        onApply={mockApply}
        onRemove={mockRemove}
        onCodeChange={mockCodeChange}
      />
    );

    // Check if the input and apply button are rendered when no discount is applied
    expect(
      screen.getByPlaceholderText("Enter coupon code")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /apply/i })).toBeInTheDocument();
  });

  it("calls onCodeChange when input value changes", () => {
    // Render the component with props
    render(
      <CouponInput
        couponCode=""
        discountApplied={false}
        invalidCoupon={false}
        onApply={mockApply}
        onRemove={mockRemove}
        onCodeChange={mockCodeChange}
      />
    );

    // Simulate user typing in the coupon input field
    fireEvent.change(screen.getByPlaceholderText("Enter coupon code"), {
      target: { value: "DISCOUNT10" },
    });

    // Verify that the onCodeChange function is called with the correct value
    expect(mockCodeChange).toHaveBeenCalledWith("DISCOUNT10");
  });

  it("shows the 'Apply' button when no discount is applied", () => {
    // Render the component with props indicating no discount
    render(
      <CouponInput
        couponCode="DISCOUNT10"
        discountApplied={false}
        invalidCoupon={false}
        onApply={mockApply}
        onRemove={mockRemove}
        onCodeChange={mockCodeChange}
      />
    );

    // Check if the 'Apply' button is shown when no discount is applied
    expect(screen.getByRole("button", { name: /apply/i })).toBeInTheDocument();
  });

  it("shows the 'Remove' button when a discount is applied", () => {
    // Render the component with props indicating a discount has been applied
    render(
      <CouponInput
        couponCode="DISCOUNT10"
        discountApplied={true}
        invalidCoupon={false}
        onApply={mockApply}
        onRemove={mockRemove}
        onCodeChange={mockCodeChange}
      />
    );

    // Check if the 'Remove' button is shown when a discount is applied
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
  });

  it("calls onApply when the Apply button is clicked", () => {
    // Render the component with props indicating no discount applied
    render(
      <CouponInput
        couponCode="DISCOUNT10"
        discountApplied={false}
        invalidCoupon={false}
        onApply={mockApply}
        onRemove={mockRemove}
        onCodeChange={mockCodeChange}
      />
    );

    // Simulate clicking the 'Apply' button
    fireEvent.click(screen.getByRole("button", { name: /apply/i }));

    // Verify that the onApply function is called when the Apply button is clicked
    expect(mockApply).toHaveBeenCalled();
  });

  it("calls onRemove when the Remove button is clicked", () => {
    // Render the component with props indicating a discount applied
    render(
      <CouponInput
        couponCode="DISCOUNT10"
        discountApplied={true}
        invalidCoupon={false}
        onApply={mockApply}
        onRemove={mockRemove}
        onCodeChange={mockCodeChange}
      />
    );

    // Simulate clicking the 'Remove' button
    fireEvent.click(screen.getByRole("button", { name: /remove/i }));

    // Verify that the onRemove function is called when the Remove button is clicked
    expect(mockRemove).toHaveBeenCalled();
  });

  it("shows the invalid coupon message when invalidCoupon is true", () => {
    // Render the component with an invalid coupon
    render(
      <CouponInput
        couponCode="INVALIDCODE"
        discountApplied={false}
        invalidCoupon={true}
        onApply={mockApply}
        onRemove={mockRemove}
        onCodeChange={mockCodeChange}
      />
    );

    // Check if the invalid coupon error message is displayed
    expect(screen.getByText(/Invalid coupon code/)).toBeInTheDocument();
  });

  it("shows the success message when discountApplied is true", () => {
    // Render the component with a successful discount applied
    render(
      <CouponInput
        couponCode="DISCOUNT10"
        discountApplied={true}
        invalidCoupon={false}
        onApply={mockApply}
        onRemove={mockRemove}
        onCodeChange={mockCodeChange}
      />
    );

    // Check if the success message for applied discount is displayed
    expect(screen.getByText(/10% discount applied!/)).toBeInTheDocument();
  });
});
