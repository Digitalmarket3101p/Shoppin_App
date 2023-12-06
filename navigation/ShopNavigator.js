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
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import SignUp from '../screens/home/SignUp';
import Login from '../screens/home/Login';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

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
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="Edit Product" component={EditProductScreen} />
    </Stack.Navigator>
  );

  const HomeScreen = () => {
    console.log('hello');
    <SafeAreaView>
      <Text>Hello</Text>
    </SafeAreaView>;
    // <Stack.Navigator
    // screenOptions={{
    //   headerStyle: {
    //     backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    //   },
    //   headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    // }}>
    // <Stack.Screen
    //   name="All Products"
    //   component={ProductOverviewScreen}
    //   options={{headerShown: false}} // Add this line to hide the header
    // />
    // </Stack.Navigator>
    // <Drawer.Navigator initialRouteName="Products">
    //   <Drawer.Screen
    //     name="Products"
    //     component={ProductStack}
    //     options={{
    //       headerTitle: 'All products',
    //       headerRight: () => (
    //         <TouchableOpacity
    //           onPress={() => {
    //             // Navigate to the CartScreen component
    //             navigation.navigate('CartScreen');
    //           }}
    //           style={{marginRight: 15}}>
    //           <Icon name="shopping-cart" size={30} color={Colors.primary} />
    //         </TouchableOpacity>
    //       ),
    //       drawerIcon: ({color, size}) => (
    //         <Icon name="list" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   <Drawer.Screen
    //     name="Orders"
    //     component={OrderScreen}
    //     options={{
    //       drawerIcon: ({color, size}) => (
    //         <Icon name="bookmarks" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   <Drawer.Screen
    //     name="Admin"
    //     component={UserProductScreen}
    //     options={{
    //       drawerIcon: ({color, size}) => (
    //         <Icon name="settings" color={color} size={size} />
    //       ),
    //       headerRight: () => (
    //         <TouchableOpacity
    //           onPress={() => {
    //             // Navigate to the CartScreen component
    //             navigation.navigate('Edit Product');
    //           }}
    //           style={{marginRight: 15}}>
    //           <Icon
    //             name="border-color"
    //             size={25}
    //             color={Platform.OS === 'android' ? 'white' : Colors.primary}
    //           />
    //         </TouchableOpacity>
    //       ),
    //     }}
    //   />
    // </Drawer.Navigator>
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      }}>
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
        name="HomeScreen"
        component={ProductOverviewScreen}
        // options={{headerShown: false}} // Add this line to hide the header
      />
      {/* <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="Edit Product" component={EditProductScreen} /> */}
    </Stack.Navigator>
    // <Drawer.Navigator initialRouteName="Products">
    //   <Drawer.Screen
    //     name="Products"
    //     component={ProductStack}
    //     options={{
    //       headerTitle: 'All products',
    //       headerRight: () => (
    //         <TouchableOpacity
    //           onPress={() => {
    //             // Navigate to the CartScreen component
    //             navigation.navigate('CartScreen');
    //           }}
    //           style={{marginRight: 15}}>
    //           <Icon name="shopping-cart" size={30} color={Colors.primary} />
    //         </TouchableOpacity>
    //       ),
    //       drawerIcon: ({color, size}) => (
    //         <Icon name="list" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   <Drawer.Screen
    //     name="Orders"
    //     component={OrderScreen}
    //     options={{
    //       drawerIcon: ({color, size}) => (
    //         <Icon name="bookmarks" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   <Drawer.Screen
    //     name="Admin"
    //     component={UserProductScreen}
    //     options={{
    //       drawerIcon: ({color, size}) => (
    //         <Icon name="settings" color={color} size={size} />
    //       ),
    //       headerRight: () => (
    //         <TouchableOpacity
    //           onPress={() => {
    //             // Navigate to the CartScreen component
    //             navigation.navigate('Edit Product');
    //           }}
    //           style={{marginRight: 15}}>
    //           <Icon
    //             name="border-color"
    //             size={25}
    //             color={Platform.OS === 'android' ? 'white' : Colors.primary}
    //           />
    //         </TouchableOpacity>
    //       ),
    //     }}
    //   />
    // </Drawer.Navigator>
  );
};

export default ProductsNavigator;
