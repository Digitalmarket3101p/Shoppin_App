import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
const ProductDetailScreen = props => {
  const selectedProduct = useSelector(state => {
    // console.log("hello",state);
    const productId = props.route.params.productId;
    return state.products.availableProducts.find(prod => prod.id === productId);
  });

  const dispatch=useDispatch()
  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: selectedProduct.title,
    });
  }, [props.navigation, selectedProduct]);

  return (
    <ScrollView>
      <Image style={styles.img} source={{uri: selectedProduct.imgUrl}} />
      <View style={styles.actions}>

      <Button color={Colors.primary} title="Add To Cart" onPress={() => {
        dispatch(cartActions.addToCart(selectedProduct))
      }} />
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
    fontSize: 26,
    textAlign: 'center',
    color: 'blue',
    marginVertical: 20,
  },
  descrption: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily:'Bold',
    marginHorizontal:20
  },
  actions:{
    marginVertical:10,
    alignItems:'center',

  }
});
