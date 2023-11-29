import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import {createSelector} from 'reselect';
import * as cartActions from '..//../store/actions/cart';
import * as orderActions from '..//../store/actions/order';
const selectCartItem = state => {
  const transformedCartItems = [];
  console.log('state', state.cart.items);
  for (const key in state.cart.items) {
    transformedCartItems.push({
      productId: key,
      productTitle: state.cart.items[key].productTitle,
      productPrice: state.cart.items[key].productPrice,
      quantity: state.cart.items[key].quantity,
      sum: state.cart.items[key].sum,
    });
  }
  return transformedCartItems.sort((a, b) =>
    a.productId > b.productId ? 1 : -1,
  );
};
const cartItemsSelector = createSelector(
  [selectCartItem],
  cartItems => cartItems,
);

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(cartItemsSelector);
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            // console.log('hjhjh', cartItems);
            dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
          }}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            qunatity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(cartActions.removefromcart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  amount: {
    color: Colors.primary,
  },
  summaryText: {
    fontFamily: 'Bold',
    fontSize: 18,
  },
});
