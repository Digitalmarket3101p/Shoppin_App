import CartItem from '../../models/cart-item';
import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';

const inititalState = {
  items: {},
  totalAmount: 0,
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodprice = action.price;
      const prodTitle = action.title;
      let updatedOrNewCartItem;
      if (state.items[action.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[action.id].quantity + 1,
          prodprice,
          prodTitle,
          state.items[action.id].sum + prodprice,
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodprice, prodTitle, prodprice);
      }
      return {
        ...state,
        items: {...state.items, [action.id]: updatedOrNewCartItem},
        totalAmount: state.totalAmount + prodprice,
      };
    case REMOVE_FROM_CART:
      const selectedcartitem = state.items[action.pid];
      // console.log("selected",selectedcartitem);
      const currentqty = selectedcartitem.quantity;
      let updatedCartItems;
      if (currentqty > 1) {
        //reduce
        const updatedcartitem = new CartItem(
          selectedcartitem.quantity - 1,
          selectedcartitem.productPrice,
          selectedcartitem.productTitle,
          selectedcartitem.sum - selectedcartitem.productPrice,
        );
        updatedCartItems = {...state.items, [action.pid]: updatedcartitem};
      } else {
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedcartitem.productPrice,
      };
    default:
      return state;
  }
};
