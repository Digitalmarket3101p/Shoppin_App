import Order from '../../models/order';
import {ADD_ORDER} from '../actions/order';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const neworder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date(),
      );
      return {
        ...state,
        orders: [...state.orders, neworder],
      };
  }
  return state;
};
