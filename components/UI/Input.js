import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Input = props => {
  return (
    <View style={styles.form}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={formState.inputValues.title}
        onChangeText={changeHander.bind(this, 'title')}
      />
      {!formState.inputValidities.title && (
        <Text>{props.errortext}</Text>
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
});
