export const getSizeCart = () => {
  const productsInCartString = localStorage.getItem('productsInCart');
  const productsInCart = productsInCartString ? JSON.parse(productsInCartString) : [];
  const totalItems = productsInCart.reduce((acc, curr) => curr.quantity + acc, 0);
  return totalItems;
};

export default getSizeCart;
