import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemdata}>
        <Text style={styles.quantity}>{props.qunatity}</Text>
        <Text style={styles.title}>{props.title}</Text>
      </Text>
      <View style={styles.itemdata}>
        <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}>
            <Icon
              name="delete"
              size={30}
              color={Platform.OS === 'android' ? 'white' : Colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
   
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemdata: {
    backgroundColor:'pink',
    flexDirection: 'row',
    alignItems: 'center',
   
    margin:10,

  },
  quantity: {
    fontFamily: 'OpenSans-Bold',
    color: Colors.primary,
    fontSize: 18,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  amount: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});
