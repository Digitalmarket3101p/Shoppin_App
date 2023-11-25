import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import Colors from '../constants/Colors';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        }}>
        <Stack.Screen
          name="ProductsOverview"
          component={ProductOverviewScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ProductsNavigator;
