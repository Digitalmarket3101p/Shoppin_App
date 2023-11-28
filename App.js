import {StyleSheet} from 'react-native';
import React from 'react';

import {Provider} from 'react-redux';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import productReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';
import cartReducer from './store/reducers/cart';

const rootReducer = combineReducers({
  products: productReducer,
  cart:cartReducer
});

const store = configureStore({
  reducer: rootReducer, // Pass the rootReducer to the store
});

const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     // backgroundColor: 'green',
//   },
// });

export default App;
