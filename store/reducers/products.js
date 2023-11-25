import PRODUCTS from "../../data/dummy-data";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // You can handle specific actions here in the future
    // case 'SOME_ACTION':
    //   return updatedState;
    default:
      return state.availableProducts;
  }
};

export default productReducer;
