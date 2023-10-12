import React, { useState, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TOTAL_QUESTIONS_IN_ROUND } from '../utils/variables';
import { AnimatedIcon } from './AnimatedIcon';
import { useSelector, useDispatch } from 'react-redux';
import { setArtistsRounds } from '../store/gameSlice';

const circleRadius = 100;

export const CongratulationPopUp = ({questionAnswers, setIsRoundEnd}) => {
  const dispatch = useDispatch();

  const artistsRounds = useSelector((state) => state.game.artistsRounds);
  const roundNumber = useSelector((state) => state.round.roundNumber);
  const correctAnswersCount = questionAnswers.reduce((accum, current) => current === true ? accum += 1 : accum, 0);

  const icons = Array.from({ length: TOTAL_QUESTIONS_IN_ROUND }).map((_, index) => {
    const iconName = index < correctAnswersCount ? 'star-sharp' : 'star-outline';
    return (
      <AnimatedIcon key={index} index={index} iconsName={iconName}/>
    );
  });

  const endRound = async () => {
    try {
      const storage = await AsyncStorage.getItem('storage');
      const data = JSON.parse(storage);

      const prevResult = artistsRounds[roundNumber] ? artistsRounds[roundNumber].reduce((accum, current) => current === true ? accum += 1 : accum, 0) : 0;
      const currentResult = questionAnswers.reduce((accum, current) => current === true ? accum += 1 : accum, 0);

      if (currentResult > prevResult) {
        data.artistsRounds[roundNumber] = questionAnswers;
        AsyncStorage.setItem('storage', JSON.stringify(data));
        dispatch(setArtistsRounds(data.artistsRounds));
      }

      setIsRoundEnd(false);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Congratulations!</Text>
      <View style={styles.circle}>
        <Text style={styles.text}>{correctAnswersCount} / {TOTAL_QUESTIONS_IN_ROUND}</Text>
        {icons}
      </View>
      <TouchableOpacity onPress={endRound}>
        <Text style={styles.text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '50%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  circle: {
    width: 2 * circleRadius,
    height: 2 * circleRadius,
    position: 'relative',
    justifyContent: 'center'
  },
  iconContainer: {
    position: 'absolute',
  },
  text: {
    textAlign: 'center',
    fontSize: 36,
  },
});