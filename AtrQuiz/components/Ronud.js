import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TOTAL_QUESTIONS_IN_ROUND } from '../utils/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Round = ({ category, roundNumber, rating }) => {

  let StarIcon = () => {
    let iconName;

    switch (rating) {
      case '1':
        iconName = 'star-outline';
        break;
      case '2':
        iconName = 'star-half-sharp';
        break;
      case '3':
        iconName = 'star-sharp';
        break;
      default:
        break;
    }
    return <Ionicons style={styles.icon} name={iconName} size={30} color={'yellow'} />;
  }

  return (
    <TouchableOpacity disabled style={styles.button} onPress={() => { console.log(1) }}>
      <Text style={styles.title}>{category} round {roundNumber + 1}</Text>
      <View style={styles.resultContainer} >
        <Text style={styles.text}>{rating}</Text>
        <Text style={styles.text}>/</Text>
        <Text style={styles.text}>{TOTAL_QUESTIONS_IN_ROUND}</Text>
        <StarIcon />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    marginVertical: 10,
    backgroundColor: 'red',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'black',
  }, resultContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }, title: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold'
  }, text: {
    marginHorizontal: 5,
    fontSize: 20,
    fontWeight: 'bold'
  }, icon: {
    marginHorizontal: 10
  }
});