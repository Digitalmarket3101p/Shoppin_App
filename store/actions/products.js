import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCT';

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://shoppingapp-37f4a-default-rtdb.firebaseio.com/products.json',
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      console.log(response);
      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imgUrl,
            resData[key].description,
            resData[key].price,
          ),
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
      });
    } catch (error) {
      throw error;
    }
  };
};
export const deleteProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    pid: productId,
  };
};

export const createProduct = (title, imgUrl, price, description) => {
  console.log(title);
  return async dispatch => {
    const response = await fetch(
      'https://shoppingapp-37f4a-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          imgUrl,
          price,
          description,
        }),
      },
    );
    console.log(response);
    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imgUrl,
        price,
      },
    });
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
