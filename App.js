import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit';
import productReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import AuthHome from './screens/auth/AuthHome';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import AuthProvider from './providers/AuthProvider';

const composedEnhancer = applyMiddleware(thunkMiddleware);
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const store = configureStore({
  reducer: rootReducer, // Pass the rootReducer to the store
  composedEnhancer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AuthHome />
      </AuthProvider>
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
