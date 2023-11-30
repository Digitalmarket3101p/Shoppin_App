import {FlatList, StyleSheet, Text, View, Button, Alert} from 'react-native';
import React from 'react';
import ProductItem from '../../components/shop/ProductItem';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';

const UserProductScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate('Edit Product', {productId: id});
  };
  const deleteHandler = id => {
    Alert.alert('Are You Sure?', 'Do you Really want to delete this item?', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        },
      },
    ]);
  };
  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemdata => (
        <ProductItem
          image={itemdata.item.imgUrl}
          title={itemdata.item.title}
          price={itemdata.item.price}
          onSelect={() => {}}>
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemdata.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              deleteHandler(itemdata.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductScreen;

const styles = StyleSheet.create({});
