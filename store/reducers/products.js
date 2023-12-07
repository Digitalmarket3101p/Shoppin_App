import PRODUCTS from '../../data/dummy-data';
import Product from '../../src/models/product';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  READ_PRODUCTS,
  UPDATE_PRODUCT,
} from '../actions/products';

const initialState = {
  availableProducts: [...PRODUCTS],
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_PRODUCTS:
      return {
        availableProducts: [...state.availableProducts, ...action.products],
        userProducts: action.products.filter(prod => prod.ownerId === 'u1'),
      };

    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        'u1',
        action.productData.title,
        action.productData.imgUrl,
        action.productData.description,
        action.productData.price,
      );
      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct],
      };

    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.pid,
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imgUrl,
        action.productData.description,
        state.userProducts[productIndex].price,
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const availbaleProduct = state.userProducts.findIndex(
        prod => prod.id === action.pid,
      );
      const updatedAvailableProducts = [...state.userProducts];
      updatedAvailableProducts[availbaleProduct] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.pid,
        ),
      };

    default:
      return state;
  }
};

export default productReducer;
