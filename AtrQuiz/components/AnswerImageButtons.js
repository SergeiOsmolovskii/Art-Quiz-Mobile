import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { currentShuffleQuestionImagesAnswers } from '../utils/helpers';
import { AnswerImageButton } from './AnswerImageButton';

export const AnswerImageButtons = ({ questionData, imagesData, handlePressImageButton, areImagesVisible, onImageLoad}) => {
  const answers = useMemo(() => currentShuffleQuestionImagesAnswers(imagesData, questionData), [imagesData, questionData]);

  return (
    <View style={[styles.container, !areImagesVisible && styles.hidden]}>
      {answers.map((item, index) => (
        <AnswerImageButton
          key={index}
          item={item}
          questionData={questionData}
          handlePressImageButton={handlePressImageButton}
          onImageLoad={onImageLoad}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'space-between',
  }, hidden : {
    opacity: 0
  }
});