import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import {AuthContext} from '../../providers/AuthProvider';
import ShopNavigator from '../../navigation/ShopNavigator';
import {NavigationContainer} from '@react-navigation/native';

const AuthHome = () => {
  const {user, setUser} = useContext(AuthContext);
  const [isLoginOrRegister, setIsLoginOrRegister] = useState(null);
  const [userDeatils, setUserDetails] = useState({
    email: '',
    password: '',
    isLoginOrRegister: null,
  });

  const handleLoginClick = () => {
    setIsLoginOrRegister('Login');
    setUserDetails({
      email: '',
      password: '',
      isLoginOrRegister: null,
    });
  };

  const handleRegisterClick = () => {
    setIsLoginOrRegister('Register');
    setUserDetails({
      email: '',
      password: '',
      isLoginOrRegister: null,
    });
  };

  const handleEmailChange = email => {
    setUserDetails(prevState => {
      return {
        ...prevState,
        email: email,
      };
    });
  };

  const handlePasswordChange = password => {
    setUserDetails(prevState => {
      return {
        ...prevState,
        password: password,
      };
    });
  };

  const handleLoginSubmit = () => {
    setUser(() => {
      return {
        email: userDeatils.email,
        password: userDeatils.password,
        isLoginOrRegister: isLoginOrRegister,
      };
    });
  };

  return (
    <>
      {user.isLogin === true && (
        <NavigationContainer>
          <ShopNavigator />
        </NavigationContainer>
      )}
      {user.isLogin === false && (
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.greeting}>Welcome to Shopping App</Text>
            {isLoginOrRegister === null && (
              <View style={styles.btnContainer}>
                <Pressable style={styles.button} onPress={handleLoginClick}>
                  <Text style={styles.text}>Login</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleRegisterClick}>
                  <Text style={styles.text}>Register</Text>
                </Pressable>
              </View>
            )}
            {isLoginOrRegister === 'Login' && (
              <>
                <View style={styles.formContainer}>
                  <TextInput
                    placeholder="Email"
                    style={styles.input}
                    onChangeText={handleEmailChange}
                    autoCapitalize="none"
                  />
                  <TextInput
                    placeholder="Password"
                    style={styles.input}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={true}
                  />
                </View>
                <View style={styles.btnContainer}>
                  <Pressable style={styles.button} onPress={handleLoginSubmit}>
                    <Text style={styles.text}>Submit</Text>
                  </Pressable>
                  <Pressable
                    style={styles.button}
                    onPress={handleRegisterClick}>
                    <Text style={styles.text}>Register</Text>
                  </Pressable>
                </View>
              </>
            )}
            {isLoginOrRegister === 'Register' && (
              <>
                <View style={styles.formContainer}>
                  <TextInput
                    placeholder="Email"
                    style={styles.input}
                    onChangeText={handleEmailChange}
                    autoCapitalize="none"
                  />
                  <TextInput
                    placeholder="Password"
                    style={styles.input}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={true}
                  />
                </View>
                <View style={styles.btnContainer}>
                  <Pressable style={styles.button} onPress={handleLoginSubmit}>
                    <Text style={styles.text}>Submit</Text>
                  </Pressable>
                  <Pressable style={styles.button} onPress={handleLoginClick}>
                    <Text style={styles.text}>Login</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: 5,
    gap: 5,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
});

export default AuthHome;
