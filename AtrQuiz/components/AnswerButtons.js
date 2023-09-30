import React, { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { currentShuffleQuestionAnswers } from '../utils/helpers';
import { AnswerButton } from './AnswerButton';

export const AnswerButtons = ({questionData, imagesData, setQuestionNumber}) => {
  const answers = useMemo(() => currentShuffleQuestionAnswers(imagesData, questionData.author), [imagesData, questionData.author]);

  const [isAnswerSelected, setIsAnswerSelected] = useState(false);


  const [buttons, setButtons] = useState(
    answers.map(item => ({
      key: item,
      item,
      questionData,
      setQuestionNumber,
      isSelected: false,
    }))
  );

  const selectCorrectAnswer = (selectedButton) => {
    const correctButton = buttons.find((button) => button.item === questionData.author);
    const currentButton = buttons.find((button) => button.item === selectedButton);

    if (correctButton) {
      correctButton.isSelected = true;
      currentButton.isSelected = true;
      setButtons([...buttons]);
      setIsAnswerSelected(true);
    }
  };

  return (
    <View style={styles.container}>
      {buttons.map((button) => (
        <AnswerButton
          key={button.key}
          {...button}
          selectCorrectAnswer={selectCorrectAnswer}
          isAnswerSelected={isAnswerSelected}
        />
      ))}

    </View>
  );
}

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