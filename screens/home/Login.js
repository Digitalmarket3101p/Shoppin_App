/* eslint-disable prettier/prettier */
import React, {useState} from 'react';

import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppInput from '../../components/UI/AppInput';
// import auth from '@react-native-firebase/auth';
import * as authActions from '../../store/actions/auth';
import {useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Login = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({email: '', password: ''});
  const updateInputval = (val, key) => {
    const value = {...values};
    value[key] = val;
    setValues({...value});
  };
  const loginSubmit = () => {
    console.log('valuesssss', values);
    if (values.email === '' || values.password === '') {
      Alert.alert('Enter all required fields.');
      return false;
    }
    dispatch(authActions.login(values.email, values.password));
    setValues({name: '', email: '', password: ''});
    navigate('HomeScreen');
    // if (!values.email && !values.password) {
    //   Alert.alert('Enter a required fields.');
    //   return false;
    // }
    // auth()
    //   .signInWithEmailAndPassword(values.email, values.password)
    //   .then(res => {
    //     console.log(res);
    //     setValues({email: '', password: ''});
    //     navigate('All Products');
    //   })
    //   .catch(error => console.log(error.message));
  };
  return (
    <SafeAreaView>
      <View style={{padding: 20}}>
      <View style={{alignItems: 'center'}}>
          <Text style={{
              fontSize: 20,
              color: 'black',
              marginVertical: 10,
              fontWeight: 'bold',
              textShadowColor: 'pink',  // Set the shadow color to pink
              textShadowOffset: { width: 2, height: 2 },  // Set the shadow offset
              textShadowRadius: 5, fontSize: 20,
              color: 'black',
              marginVertical: 10,
              fontWeight: 'bold',
              shadowColor:'pink'
            }}>WELCOME TO THE SHOPPING APP</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 30,
              color: Colors.primary,
              marginVertical: 10,
              fontWeight: 'bold',
            }}>
            Login Here
          </Text>
        </View>
        <View style={{marginVertical: 30}}>
          <AppInput
            name="email"
            value={values.email}
            updateInputval={updateInputval}
            secure={false}
          />
          <AppInput
            name="password"
            value={values.password}
            updateInputval={updateInputval}
            secure={true}
          />
        </View>

        <TouchableOpacity
          onPress={() => loginSubmit()}
          style={{
            padding: 20,
            marginVertical: 10,
            borderRadius: 10,
            backgroundColor: Colors.primary,
            shadowOffset: {width: 0, height: 10},
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}>
          <Text style={{color: '#fff', textAlign: 'center', fontSize: 20}}>
            Sign in
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigate('Signup');
          }}
          style={{padding: 20, marginVertical: 30}}>
          <Text style={{color: Colors.primary, textAlign: 'center', fontSize: 20}}>
            Create new account ?
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
