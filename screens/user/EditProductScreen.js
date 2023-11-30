import React, {useState, useEffect, useCallback, useReducer} from 'react';
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
  // console.log('prodid', prodId);

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
      Alert.alert('wrong input!', 'please check the error in the form.', [
        {text: 'okay'},
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
    // console.log('submitting');
  }, [dispatch, prodId, formState]);

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

  const changeHander = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: REDUCER_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier,
    });
  };

  return (
    <ScrollView>
      <View style={styles.formview}>
        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={changeHander.bind(this, 'title')}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          {!formState.inputValidities.title && (
            <Text>Please enter a valid title!</Text>
          )}
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>image</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imgUrl}
            onChangeText={changeHander.bind(this, 'imgUrl')}
          />
        </View>

        {!editedProduct && (
          <View style={styles.form}>
            <Text style={styles.label}>price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={changeHander.bind(this, 'price')}
              keyboardType="decimal-pad"
            />
          </View>
        )}

        <View style={styles.form}>
          <Text style={styles.label}>description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={changeHander.bind(this, 'description')}
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
