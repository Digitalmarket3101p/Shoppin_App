import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const ProductItem = props => {
  let Touchable = TouchableOpacity;
  if (Platform.OS === 'android') {
    Touchable = TouchableNativeFeedback;
  }
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <Touchable onPress={props.onViewDetail} useForeground>
          <View>

          <View style={styles.imgcontainer}>
            <Image
              style={styles.img}
              source={{
                uri: props.image,
              }}
              />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price}</Text>
          </View>
          <View style={styles.action}>
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={props.onViewDetail}
              />
            <Button
              color={Colors.primary}
              title="To Cart"
              onPress={props.onAddCart}
              />
          </View>
              </View>
        </Touchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: 'black',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
  details: {
    alignItems: 'center',
    height: '15%',
  },
  imgcontainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  touchable: {
    overflow: 'hidden',
    borderRadius:10
  },
});
export default ProductItem;