import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';
const EditProductScreen = ({route, navigation}) => {
  const prodId = route.params ? route.params.productId : null;
  // console.log('prodid', prodId);

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId),
  );
  const dispatch = useDispatch();
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [img, setImg] = useState(editedProduct ? editedProduct.imgUrl : '');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : '',
  );

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productActions.updateProduct(prodId, title, img, price, description),
      );
    } else {
      dispatch(productActions.createProduct(title, img, price, description));
    }
    navigation.goBack();
    // console.log('submitting');
  }, [dispatch, prodId, title, description, img]);
  useEffect(() => {
    // navigation.setParams({submit: submitHandler});
    navigation.setOptions({
      headerTitle: prodId ? 'Edit Product' : 'Add Product',
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 15}}>
          <Icon
            name="check"
            size={30}
            color={Platform.OS === 'android' ? 'white' : Colors.primary}
            onPress={submitHandler}
          />
        </TouchableOpacity>
      ),
    });
  }, [prodId, navigation, submitHandler]);

  return (
    <ScrollView>
      <View style={styles.formview}>
        <View style={styles.form}>
          <Text style={styles.label}>title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
            keyboardType="default"
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>image</Text>
          <TextInput
            style={styles.input}
            value={img}
            onChangeText={text => setImg(text)}
          />
        </View>

        {!editedProduct && (
          <View style={styles.form}>
            <Text style={styles.label}>price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
              keyboardType="decimal-pad"
            />
          </View>
        )}

        <View style={styles.form}>
          <Text style={styles.label}>description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formview: {
    margin: 20,
  },
  label: {
    fontFamily: 'Bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: 'pink',
    borderBottomWidth: 1,
  },
  form: {
    width: '100%',
  },
});

export default EditProductScreen;
