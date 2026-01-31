export const calculateTotal = (cart) =>
  cart.reduce((sum, i) => sum + i.price * i.qty, 0);
