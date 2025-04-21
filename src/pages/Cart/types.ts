export interface CartItemProps {
  item: {
    id: string;
    title: string;
    image: {
      url: string;
      alt: string;
    };
    discountedPrice: number;
    quantity: number;
  };
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export interface CouponInputProps {
  couponCode: string;
  discountApplied: boolean;
  invalidCoupon: boolean;
  onApply: () => void;
  onRemove: () => void;
  onCodeChange: (code: string) => void;
}

export interface CartSummaryProps {
  subtotal: number;
  discountAmount: number;
  discountApplied: boolean;
  total: number;
}
