import {FlatList, StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import ProductItem from '../../components/shop/ProductItem';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';

const UserProductScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();
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
          <Button color={Colors.primary} title="Edit" onPress={() => {}} />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(productActions.deleteProduct(itemdata.item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductScreen;

const styles = StyleSheet.create({});
