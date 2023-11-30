import React, {useCallback, useReducer, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
const REDUCER_UPDATE = 'UPDATE';
const formReducer = (state, action) => {
  if (action.type === 'UPDATE') {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidites = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedformIsValid = true;
    for (const key in updatedValidites) {
      updatedformIsValid = updatedformIsValid && updatedValidites[key];
    }
    return {
      formValid: updatedformIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidites,
    };
  }
  return state;
};

const EditProductScreen = ({route, navigation}) => {
  const prodId = route.params ? route.params.productId : null;

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId),
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imgUrl: editedProduct ? editedProduct.imgUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imgUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.imgUrl,
          formState.inputValues.price,
          formState.inputValues.description,
        ),
      );
    } else {
      dispatch(
        productActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.imgUrl,
          formState.inputValues.price,
          formState.inputValues.description,
        ),
      );
    }
    navigation.goBack();
  }, [dispatch, prodId, formState, navigation]);
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
  // ... (other code)
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: REDUCER_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );
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
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initialValid={!!editedProduct}
            required
          />
          <Input
            id="imgUrl"
            label="Image Url"
            errorText="Please enter a valid image URL!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imgUrl : ''}
            initialValid={!!editedProduct}
            required
          />

          {!editedProduct && (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              onInputChange={inputChangeHandler}
              keyboardType="decimal-pad"
              returnKeyType="next"
              required
              min={0.1}
            />
          )}

          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initialValid={!!editedProduct}
            required
            minLength={5}
          />
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
