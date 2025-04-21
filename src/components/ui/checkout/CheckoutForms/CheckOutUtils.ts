export const generateOrderNumber = () =>
  `#VT${Math.floor(100000 + Math.random() * 900000)}`;

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const getEstimatedDelivery = () => {
  const deliveryDate = new Date();
  deliveryDate.setDate(
    deliveryDate.getDate() + 3 + Math.floor(Math.random() * 3)
  );
  return formatDate(deliveryDate);
};
