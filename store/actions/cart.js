export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = product => {
  // console.log('product===>', product);
  return {
    type: ADD_TO_CART,
    discription: product.discription,
    price: product.price,
    title: product.title,
    id: product.id,
  };
};

export const removefromcart = productId => {
  // console.log("remove",productId);
  return {type: REMOVE_FROM_CART, pid: productId};
};
