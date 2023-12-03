import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const READ_PRODUCTS = 'READ_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://shoppingapp-37f4a-default-rtdb.firebaseio.com/products.json',
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

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
        type: READ_PRODUCTS,
        products: loadedProducts,
      });
    } catch (error) {
      // Dispatch an action to handle the error
      console.error('Error fetching products:', error);
      // You might want to dispatch an action to handle the error
    }
  };
};

export const createProduct = (title, imgUrl, price, description) => {
  return async dispatch => {
    try {
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

      const resData = await response.json();

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
    } catch (error) {
      // Dispatch an action to handle the error
      console.error('Error creating product:', error);
      // You might want to dispatch an action to handle the error
    }
  };
};

export const updateProduct = (id, title, imgUrl, price, description) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://shoppingapp-37f4a-default-rtdb.firebaseio.com/products/${id}.json`,
        {
          method: 'PATCH',
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

      dispatch({
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
          title,
          imgUrl,
          price,
          description,
        },
      });
    } catch (error) {
      // Dispatch an action to handle the error
      console.error('Error updating product:', error);
      // You might want to dispatch an action to handle the error
    }
  };
};

export const deleteProduct = productId => {
  return async dispatch => {
    try {
      await fetch(
        `https://shoppingapp-37f4a-default-rtdb.firebaseio.com/products/${productId}.json`,
        {
          method: 'DELETE',
        },
      );

      dispatch({
        type: DELETE_PRODUCT,
        pid: productId,
      });
    } catch (error) {
      // Dispatch an action to handle the error
      console.error('Error deleting product:', error);
      // You might want to dispatch an action to handle the error
    }
  };
};
