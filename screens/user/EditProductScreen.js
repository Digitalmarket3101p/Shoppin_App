import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';
import Input from '../../components/UI/Input';

const EditProductScreen = ({route, navigation}) => {
  const prodId = route.params ? route.params.productId : null;
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId),
  );
  const dispatch = useDispatch();
  const [editedData, setEditedData] = useState();
  const [_, setIsModifiedFieldValid] = useState({});

  const submitHandler = () => {
    if (editedProduct) {
      const errorObj = {};
      for (const key in editedData) {
        if (editedData[key] === '') {
          errorObj[key] = true;
        }
      }
      if (Object.keys(errorObj).length > 0) {
        return;
      } else {
        setIsModifiedFieldValid({});
        dispatch(
          productActions.updateProduct(
            prodId,
            editedData.title,
            editedData.imgUrl,
            editedData.price,
            editedData.description,
          ),
        );
      }
    } else if (prodId === null) {
      dispatch(
        productActions.createProduct(
          editedData.title,
          editedData.imgUrl,
          editedData.price,
          editedData.description,
        ),
      );
    }
    navigation.goBack();
  };

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

  useEffect(() => {
    if (prodId) {
      setEditedData(editedProduct);
    } else {
      setEditedData({
        title: '',
        imgUrl: '',
        description: '',
        price: '',
      });
    }
  }, [prodId]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.formview}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            initialValue={editedData ? editedData.title : ''}
            initialValid={!!editedProduct}
            setEditedData={setEditedData}
            required
          />
          <Input
            id="imgUrl"
            label="Image Url"
            errorText="Please enter a valid image URL!"
            keyboardType="default"
            returnKeyType="next"
            initialValue={editedData ? editedData.imgUrl : ''}
            initialValid={!!editedProduct}
            setEditedData={setEditedData}
            required
          />
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            initialValue={editedData ? editedData.description : ''}
            initialValid={!!editedProduct}
            setEditedData={setEditedData}
            required
            minLength={5}
          />

          {!editedProduct && (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              setEditedData={setEditedData}
              required
              min={0.1}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  formview: {
    margin: 20,
  },
});
