import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
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
import ProductsNavigator from './navigation/ShopNavigator';

// const Stack = createStackNavigator();
const composedEnhancer = applyMiddleware(thunkMiddleware);
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
  composedEnhancer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <Stack.Navigator>
          <Stack.Screen
            name="Signup"
            component={SignUp}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: true}}
          />
          <Stack.Screen
        name="All Products"
        component={ProductOverviewScreen}
        options={{headerShown: false}} // Add this line to hide the header
      />
        </Stack.Navigator> */}
        <ProductsNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
