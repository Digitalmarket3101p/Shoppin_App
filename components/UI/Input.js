import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useEffect, useReducer} from 'react';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialValid,
    touched: false,
  });

  const {onInputChange, id} = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const lostFocusHandler = () => {
    dispatch({type: INPUT_BLUR});
  };

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

    dispatch({type: INPUT_CHANGE, value: text, isValid: isValid});
    return isValid;
  };

  return (
    <View style={{...styles.form, ...props.containerStyle}}>
      <Text style={{...styles.label, ...props.labelStyle}}>{props.label}</Text>
      <TextInput
        {...props}
        style={{...styles.input, ...props.inputStyle}}
        value={inputState.value}
        onChangeText={validateInput}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
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
