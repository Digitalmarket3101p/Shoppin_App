import React from 'react';
import 'react-native-gesture-handler';
import {Platform, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CartScreen from '../screens/shop/CartScreen';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ProductsNavigator = () => {
  const navigation = useNavigation();

  const ProductStack = () => (
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
      options={{ headerShown: false }} // Add this line to hide the header
    />
    <Stack.Screen
      name="ProductDetailScreen"
      component={ProductDetailScreen}
    />
    <Stack.Screen name="CartScreen" component={CartScreen} />
  </Stack.Navigator>
  );

  return (
    <Drawer.Navigator initialRouteName="Products">
      <Drawer.Screen name="Products" component={ProductStack}  options={{
        headerTitle:'All products',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // Navigate to the CartScreen component
                navigation.navigate('CartScreen');
              }}
              style={{marginRight: 15}}>
              <Icon
                name="shopping-cart"
                size={30}
                color={Platform.OS === 'android' ? 'white' : Colors.primary}
              />
            </TouchableOpacity>
          ),
        }}/>
      <Drawer.Screen name="Orders" component={OrderScreen} />
    </Drawer.Navigator>
  );
};

export default ProductsNavigator;