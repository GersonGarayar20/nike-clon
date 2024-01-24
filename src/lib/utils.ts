export const applyDiscount = (price: number, discount: number): string => {
  const discountedPrice = price - (price * discount) / 100;

  return discountedPrice.toFixed(2);
}