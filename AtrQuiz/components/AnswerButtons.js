import React, { useState, useMemo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { currentShuffleQuestionAnswers } from '../utils/helpers';
import { AnswerButton } from './AnswerButton';

export const AnswerButtons = ({ questionData, imagesData, handlePressButton }) => {
  const answers = useMemo(() => currentShuffleQuestionAnswers(imagesData, questionData.author), [imagesData, questionData.author]);

    return (
      <View style={styles.container}>
        {answers.map((item, index) => (
          <AnswerButton
            key={index}
            item={item}
            questionData={questionData}
            handlePressButton={handlePressButton}
            isSelected={item === questionData.author}
          />
        ))}
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});