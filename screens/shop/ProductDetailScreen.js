import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';

const ProductDetailScreen = props => {
  const selectedProduct = useSelector(state => {
    const productId = props.route.params.productId;
    return state.products.find(prod => prod.id === productId);
  });
  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: selectedProduct.title,
    });
  }, [props.navigation, selectedProduct]);

  return (
    <ScrollView>
      <Image style={styles.img} source={{uri: selectedProduct.imgUrl}} />
      <View style={styles.actions}>

      <Button color={Colors.primary} title="Add To Cart" onPress={() => {}} />
      </View>
      <Text style={styles.price}>${selectedProduct.price}</Text>
      <Text style={styles.descrption}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    textAlign: 'center',
    color: 'blue',
    marginVertical: 20,
  },
  descrption: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal:20
  },
  actions:{
    marginVertical:10,
    alignItems:'center',

  }
});
