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
import Card from '../UI/Card';

const ProductItem = props => {
  let Touchable = TouchableOpacity;
  if (Platform.OS === 'android') {
    Touchable = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <Touchable onPress={props.onSelect} useForeground>
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
             {props.children}
            </View>
          </View>
        </Touchable>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20
  },
  img: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: 'OpenSans-Bold',
  },
  price: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'OpenSans-Bold',
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
    borderRadius: 10,
  },
});
export default ProductItem;
