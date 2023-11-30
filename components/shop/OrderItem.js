import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const OrderItem = (props) => {
  const [showDetail, setShowDetail] = useState(false);
console.log("hii", props.items);
  // Check if props.items is an array before using map
  
  const renderCartItems = () => {
    if (!props.items || !Array.isArray(props.items) || props.items.length === 0) {
      return <Text>No items found.</Text>;
    }

    return props.items.map((cartItem, index) => (
        // console.log("dfdfdfdf",cartItem)
      <CartItem
        key={index}
        qunatity={cartItem.quantity}
        amount={cartItem.sum}
        title={cartItem.productTitle}
      />
    ));
  };

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetail ? 'Hide details' : 'Show details'}
        onPress={() => {
          setShowDetail((prevState) => !prevState);
        }}
      />
      {showDetail && (
        <View style={styles.detailItems}>
          {renderCartItems()}
        </View>
      )}
    </Card>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  totalAmount: {
    fontFamily: 'Bold',
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: 'silver',
  },
  detailItems:{
    width:'100%'
  }
});
