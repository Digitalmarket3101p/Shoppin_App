export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    pid: productId,
  };
};

export const createProduct = (title, imgUrl, price, description) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      description,
      imgUrl,
      price,
    },
  };
};

export const updateProduct = (id, title, imgUrl, price, description) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      imgUrl,
      price,
      description,
    },
  };
};
