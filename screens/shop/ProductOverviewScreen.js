import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
const ProductOverviewScreen = props => {
  const products = useSelector(state => state.products);
  //   console.log(products);
  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imgUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddCart={() => {}}
        />
      )}
    />
  );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({});
