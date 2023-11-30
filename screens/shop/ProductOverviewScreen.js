import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';

import Colors from '../../constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProductOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products);
  // console.log('go', products);
  const dispatch = useDispatch();
  const loadProducts = useCallback(async () => {
    setError(null)
    setIsLoading(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);
  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);
  // console.log(products);
  const selectHandler = (id, title) => {
    props.navigation.navigate('ProductDetailScreen', {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>An Error occured</Text>
        <Button
          title="Try Again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (
    !isLoading &&
    (!products || !products.userProducts || products.userProducts.length === 0)
  ) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No Products Found!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products.userProducts}
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
