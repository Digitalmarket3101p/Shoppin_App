import CartItem from '../../models/cart-item';
import {ADD_TO_CART} from '../actions/cart';

const inititalState = {
  items: {},
  totalAmount: 0,
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodprice = addedProduct.price;
      const prodTitle = addedProduct.title;
      let updatedOrNewCartItem;
      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodprice,
          prodTitle,
          state.items[addedProduct.id].sum + prodprice,
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodprice, prodTitle, prodprice);
      }
      return {
        ...state,
        items: {...state.items, [addedProduct.id]: updatedOrNewCartItem},
        totalAmount: state.totalAmount + prodprice,
      };
  }
  return state;
};
