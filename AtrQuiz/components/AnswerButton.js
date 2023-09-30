import React, { memo, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CorrectAnswerPopUp } from './CorrectAnswerPopUp';
import Modal from 'react-native-modal';


export const AnswerButton = ({ item, questionData, isSelected, selectCorrectAnswer, isAnswerSelected}) => {
  const isCorrect = item === questionData.author;
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePressButton = () => {
    if (!isSelected) {
        selectCorrectAnswer(item);
        setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.button,
          isSelected ? (isCorrect ? styles.correctButton : styles.incorrectButton) : null,
        ]}
        onPress={() => handlePressButton(item)}
        disabled={isSelected || isAnswerSelected}
      >
        <Text style={styles.buttonText}>{item !== undefined ? item.toString() : ""}</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        backdropColor={isCorrect ? 'green' : 'red'}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransition={1000}
        backdropTransitionOutTiming={1000}
        onBackdropPress={closeModal}
      >
        <CorrectAnswerPopUp questionData={questionData}/>
      </Modal>
    </>
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