export interface OrderSummaryItemProps {
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
}

export interface OrderSummaryProps {
  cartItems: Array<OrderSummaryItemProps["item"]>;
  total: number;
}
