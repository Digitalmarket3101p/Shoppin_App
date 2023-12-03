import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.item}>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.itemdata}>
        <Text style={styles.amount}>${Number(props.amount).toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}>
            <Icon
              name="delete"
              size={30}
              color={Platform.OS === 'android' ? Colors.accent : Colors.primary}
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
    padding: 1,
    backgroundColor: 'white',
    flexDirection: 'row',

    marginHorizontal: 0,
  },
  itemdata: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    gap: 5,
    flexGrow: 1,
  },
  quantity: {
    fontFamily: 'Bold',
    color: Colors.primary,
    fontSize: 18,
  },
  title: {
    fontFamily: 'Bold',
    fontSize: 16,
  },
  amount: {
    fontFamily: 'Bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});
