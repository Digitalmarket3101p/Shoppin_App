import {StyleSheet, Text, View, FlatList,Button} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';

const ProductOverviewScreen = props => {
  const products = useSelector(state => state.products);

  const dispatch = useDispatch();

  // console.log(products);
  const selectHandler = (id, title) => {
    props.navigation.navigate('ProductDetailScreen', {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <FlatList
      data={products?.availableProducts}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imgUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectHandler(itemData.item.id, itemData.item.title);
          }}>
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData?.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({});
