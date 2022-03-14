export function addToCart(product) {
  const productsInCartString = localStorage.getItem('productsInCart');
  const toAddInStorage = { allInfos: product, quantity: 1 };
  if (productsInCartString === null) {
    localStorage.setItem('productsInCart', JSON.stringify([toAddInStorage]));
    return [toAddInStorage];
  }
  const productsInCartObj = JSON.parse(productsInCartString);
  const indexSameId = productsInCartObj.findIndex((element) => (
    element.allInfos.id === product.id
  ));
  const indexDontExist = -1;
  if (indexSameId === indexDontExist) {
    productsInCartObj.push(toAddInStorage);
  } else {
    productsInCartObj[indexSameId].quantity += 1;
  }
  localStorage.setItem('productsInCart', JSON.stringify(productsInCartObj));
  return productsInCartObj;
}

export function descreaseInCart(product) {
  const productsInCartString = localStorage.getItem('productsInCart');
  const productsInCartObj = JSON.parse(productsInCartString);
  const indexSameId = productsInCartObj.findIndex((element) => (
    element.allInfos.id === product.id
  ));
  productsInCartObj[indexSameId].quantity -= 1;
  localStorage.setItem('productsInCart', JSON.stringify(productsInCartObj));
  return productsInCartObj;
}
