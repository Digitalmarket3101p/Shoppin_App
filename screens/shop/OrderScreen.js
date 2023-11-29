import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';

const OrderScreen = () => {
  const orders = useSelector(state => state.orders.orders);

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
