export interface ContactFormProps {
  formData: CheckoutFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContinue: () => void;
}

export interface PaymentFormProps {
  formData: CheckoutFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onContinue: () => void;
}

export interface ReviewFormProps {
  formData: CheckoutFormData;
  onBack: () => void;
  onSubmitOrder: () => void;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export interface OrderCompleteData {
  orderNumber: string;
  orderDate: string;
  total: number;
  estimatedDelivery: string;
}
