import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';
import {Formik} from 'formik';
import * as Yup from 'yup';

const productSchema = Yup.object().shape({
  title: Yup.string().required('Please enter the product title.'),
  description: Yup.string()
    .min(5, 'Too short')
    .max(20, 'Too long.')
    .required('Please enter the product description.'),
  imgUrl: Yup.string().required("Please enter the product's image URL."),
  price: Yup.number()
    .required('Please enter the product price.')
    .min(0.1, 'Too low.')
    .max(999999, 'Too high.'),
});

const EditProductScreen = ({route, navigation}) => {
  const prodId = route.params ? route.params.productId : null;
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId),
  );
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={100}>
      <Formik
        initialValues={
          editedProduct || {title: '', imgUrl: '', description: '', price: ''}
        }
        onSubmit={(values, {setErrors}) => {
          const errorObj = {};
          for (const key in values) {
            if (values[key] === '') {
              errorObj[key] = true;
            }
          }
          if (Object.keys(errorObj).length > 0) {
            setErrors(errorObj);
          } else {
            dispatch(
              prodId
                ? productActions.updateProduct(
                    prodId,
                    values.title,
                    values.imgUrl,
                    values.price,
                    values.description,
                  )
                : productActions.createProduct(
                    values.title,
                    values.imgUrl,
                    values.price,
                    values.description,
                  ),
            );
            navigation.goBack();
          }
        }}
        validationSchema={productSchema}>
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ScrollView>
            <View style={styles.formview}>
              <View style={{...formStyles.form}}>
                <Text style={{...formStyles.label}}>Title</Text>
                <TextInput
                  style={{...formStyles.input}}
                  value={values.title}
                  onBlur={handleBlur('title')}
                  onChangeText={handleChange('title')}
                />
                {errors.title && touched.title && (
                  <Text style={{...formStyles.errorText}}>{errors.title}</Text>
                )}
              </View>
              <View style={{...formStyles.form}}>
                <Text style={{...formStyles.label}}>Image Url</Text>
                <TextInput
                  style={{...formStyles.input}}
                  value={values.imgUrl}
                  onBlur={handleBlur('imgUrl')}
                  onChangeText={handleChange('imgUrl')}
                />
                {errors.imgUrl && touched.imgUrl && (
                  <Text style={{...formStyles.errorText}}>{errors.imgUrl}</Text>
                )}
              </View>
              <View style={{...formStyles.form}}>
                <Text style={{...formStyles.label}}>Description</Text>
                <TextInput
                  style={{...formStyles.input}}
                  value={values.description}
                  onBlur={handleBlur('description')}
                  onChangeText={handleChange('description')}
                />
                {errors.description && touched.description && (
                  <Text style={{...formStyles.errorText}}>
                    {errors.description}
                  </Text>
                )}
              </View>
              {!editedProduct && (
                <View style={{...formStyles.form}}>
                  <Text style={{...formStyles.label}}>Price</Text>
                  <TextInput
                    style={{...formStyles.input}}
                    value={values.price}
                    onBlur={handleBlur('price')}
                    onChangeText={handleChange('price')}
                  />
                  {errors.price && touched.price && (
                    <Text style={{...formStyles.errorText}}>
                      {errors.price}
                    </Text>
                  )}
                </View>
              )}
              {navigation.setOptions({
                headerTitle: prodId ? 'Edit Product' : 'Add Product',
                headerRight: () => (
                  <TouchableOpacity style={{marginRight: 15}}>
                    <Icon
                      name="check"
                      size={30}
                      color={
                        Platform.OS === 'android' ? 'white' : Colors.primary
                      }
                      onPress={handleSubmit}
                    />
                  </TouchableOpacity>
                ),
              })}
            </View>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  formview: {
    margin: 20,
  },
});

const formStyles = StyleSheet.create({
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
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
