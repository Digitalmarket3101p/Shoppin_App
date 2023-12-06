import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import * as authActions from '../../store/actions/auth';
import {useState} from 'react';
import AppInput from '../../components/UI/AppInput';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';

const SignUp = ({navigation: {navigate}}) => {
  const [values, setValues] = useState({name: '', email: '', password: ''});
  const updateInputval = (val, key) => {
    const value = {...values};
    value[key] = val;
    setValues({...value});
  };

  const dispatch = useDispatch();

  const signupHandler = () => {
    console.log('value', values);
    if (values.email === '' || values.password === '' || values.name === '') {
      Alert.alert('Enter all required fields.');
      return false;
    }
    dispatch(authActions.signup(values.email, values.password));
    setValues({name: '', email: '', password: ''});
    navigate('Login');
  };

  // const singupSubmit = () => {
  //   auth()
  //     .createUserWithEmailAndPassword(values.email, values.password)
  //     .then(res => {
  //       res.user.updateProfile({
  //         displayName: values.name,
  //       });
  //       console.log('user Created Successfully!');
  //       setValues({name: '', email: '', password: ''});
  //       navigate('Login');
  //     })
  //     .catch(error => console.log(error.message));
  // };

  return (
    <SafeAreaView>
      <View style={{padding: 20}}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              textShadowColor: 'pink', // Set the shadow color to pink
              textShadowOffset: {width: 2, height: 2}, // Set the shadow offset
              textShadowRadius: 5,
              fontSize: 20,
              color: 'black',
              marginVertical: 10,
              fontWeight: 'bold',
              shadowColor: 'pink',
              marginTop:80
              
            }}>
            WELCOME TO THE SHOPPING APP
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 22,
              color: Colors.primary,
              marginVertical: 10,
              fontWeight: 'bold',
            }}>
            Sign up Here
          </Text>
        </View>
        <View style={{marginVertical: 30}}>
          <AppInput
            name="name"
            value={values.name}
            updateInputval={updateInputval}
            secure={false}
          />
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
          onPress={() => signupHandler()}
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
            Sign up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigate('Login');
          }}
          style={{padding: 20, marginVertical: 30}}>
          <Text
            style={{color: Colors.primary, textAlign: 'center', fontSize: 20}}>
            Already have an account ?
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
