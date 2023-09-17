import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TOTAL_QUESTIONS_IN_ROUND } from '../utils/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Round = ({ category, roundNumber, rating, prevRoundRating, navigation }) => {

  let StarIcon = () => {
    const iconName =
    rating === 10 ? 'star-sharp' :
    rating >= 5 ? 'star-half-sharp' :
    'star-outline';
    return <Ionicons style={styles.icon} name={iconName} size={30} color={'yellow'} />;
  }

  return (
    <TouchableOpacity
      disabled={roundNumber > 0 && prevRoundRating < 6}
      style={[styles.button, (roundNumber > 0 && prevRoundRating < 6) && styles.disabledButton]}
      onPress={() => {navigation.navigate('Game')}}
    >
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
  },
  disabledButton: {
    backgroundColor: 'pink',
  },
  resultContainer: {
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