import 'react-native-gesture-handler';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CartScreen from '../screens/shop/CartScreen';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const ProductsNavigator = () => {
  const navigation = useNavigation();

  return (
   
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        }}>
        <Stack.Screen
          name="All Products"
          component={ProductOverviewScreen}
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  // Navigate to the CartScreen component
                  navigation.navigate('CartScreen');
                }}
                style={{ marginRight: 15 }}>
                <Icon
                  name="shopping-cart"
                  size={30}
                  color={Platform.OS === 'android' ? 'white' : Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
        />
        <Stack.Screen name="CartScreen" component={CartScreen} />
      </Stack.Navigator>
   
  );
};

export default ProductsNavigator;
