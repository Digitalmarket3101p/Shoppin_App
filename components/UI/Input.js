import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';

const Input = props => {
  const {id} = props;

  const [isModifiedFieldValid, setIsModifiedFieldValid] = useState(false);

  const validateInput = text => {
    const {required, email, min, max, minLength} = props;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;

    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min !== null && +text < min) {
      isValid = false;
    }
    if (max !== null && +text > max) {
      isValid = false;
    }
    if (minLength !== null && text.length < minLength) {
      isValid = false;
    }
    return isValid;
  };

  const inputChangeHandler = changedText => {
    const isValid = validateInput(changedText);
    if (isValid === false) {
      setIsModifiedFieldValid(!isValid);
    }

    if (isValid === true) {
      setIsModifiedFieldValid(!isValid);
    }
    // if (isValid) {
    props.setEditedData(prevState => {
      return {
        ...prevState,
        [id]: changedText,
      };
    });
    //
  };

  return (
    <View style={{...styles.form, ...props.containerStyle}}>
      <Text style={{...styles.label, ...props.labelStyle}}>{props.label}</Text>
      <TextInput
        {...props}
        style={{...styles.input, ...props.inputStyle}}
        value={props.initialValue}
        onChangeText={inputChangeHandler}
      />
      {isModifiedFieldValid && (
        <Text style={{...styles.errorText, ...props.errorTextStyle}}>
          {props.errorText}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
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
