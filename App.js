import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit';
// import {createStackNavigator} from '@react-navigation/stack';
import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import thunkMiddleware from 'redux-thunk';
// import ProductsNavigator from './navigation/ShopNavigator';
import {Provider as AuthProvider} from './src/context/auth/AuthContext';
import {Provider as ProductProvider} from './src/context/product/ProductContext';
import {Provider as CartProvider} from './src/context/cart/CartContext';
import {Provider as OrdersProvider} from './src/context/orders/OrdersContext';
import RootNavigator from './src/navigation/RootNavigator';
import {Colors} from './src/constants/Colors';
//const Stack = createStackNavigator();
const composedEnhancer = applyMiddleware(thunkMiddleware);
// const rootReducer = combineReducers({
//   products: productReducer,
//   cart: cartReducer,
//   orders: orderReducer,
// });

// const store = configureStore({
//   reducer: rootReducer,
//   composedEnhancer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
enableScreens();
const App = () => {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: `rgb(${Colors.background})`,
          text: `rgb(${Colors.text.primary})`,
        },
      }}>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrdersProvider>
              <RootNavigator />
            </OrdersProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
