import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
const ProductOverviewScreen = props => {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  // console.log(products);
  return (
    <FlatList
      data={products.availableProducts}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imgUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate('ProductDetailScreen', {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            }); // Updated line
          }}
          onAddCart={() => {
            dispatch(cartActions.addToCart(itemData?.item));
          }}
        />
      )}
    />
  );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({});
