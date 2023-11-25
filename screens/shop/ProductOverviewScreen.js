import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const ProductOverviewScreen = props => {
  const products = useSelector(state => state.products);
//   console.log(products);
  return (
      
      <FlatList
      data={products}
  
      renderItem={itemData => {
       
        return <Text>{itemData.item.title}</Text>;
      }}
      
      
    />
   
  );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({});
