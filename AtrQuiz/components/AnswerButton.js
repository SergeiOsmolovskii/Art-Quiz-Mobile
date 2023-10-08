import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export const AnswerButton = ({ item, handlePressButton }) => {

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handlePressButton(item)}
    >
      <Text style={styles.buttonText}>{item !== undefined ? item.toString() : ""}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '45%',
    minHeight: 60,
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'pink',
  }, correctButton: {
    backgroundColor: 'green',
  },
  incorrectButton: {
    backgroundColor: 'red',
  }, buttonText: {
    textAlign: 'center',
    textTransform: 'none',
    fontWeight: 'bold'
  }
});