import { useState } from 'react';
import { StyleSheet, View, Text, Vibration } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setQuestionAnswers, setQuestionNumber } from '../store/roundSlice';
import { setInitialState, setCategoryName } from '../store/roundSlice';
import { PICTURES_ROUNDS, TOTAL_QUESTIONS_IN_ROUND, TOTAL_QUESTION_BUTTONS, QUESTION_ANIMATION_TIMING, CORRECT_ANSWER_VIBRATION_PATTERN, INCORRECT_ANSWER_VIBRATION_PATTERN } from '../utils/variables';
import { DotIndicators } from './DotIndicators';
import { AnswerImageButtons } from './AnswerImageButtons';
import { AnswerPopUp } from './AnswerPopUp';
import { CongratulationPopUp } from './CongratulationPopUp';
import { useTheme } from '../theme/ThemeContext';

export const PicturesRound = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const questionNumber = useSelector((state) => state.round.questionNumber);
  const questionAnswers = useSelector((state) => state.round.questionAnswers);
  const roundNumber = useSelector((state) => state.round.roundNumber);
  const imagesData = useSelector((state) => state.imagesData);
  const vibration = useSelector((state) => state.game.settings.vibration);

  const [questionData, setQuestionData] = useState(imagesData[(roundNumber * TOTAL_QUESTIONS_IN_ROUND) + questionNumber - 1 + PICTURES_ROUNDS * TOTAL_QUESTIONS_IN_ROUND]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isHideMainScreen, setIsHideMainScreen] = useState(false);
  const [isRoundEnd, setIsRoundEnd] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loadedImageCount, setLoadedImageCount] = useState(0);
  const [areImagesVisible, setAreImagesVisible] = useState(false);

  const resetImageLoadingState = () => {
    setLoadedImageCount(0);
    setAreImagesVisible(false);
  };

  const handlePressImageButton = async (item) => {
    const isAnswerCorrect = item.author === questionData.author;
    if (vibration) {
      isAnswerCorrect ? Vibration.vibrate(CORRECT_ANSWER_VIBRATION_PATTERN) : Vibration.vibrate(INCORRECT_ANSWER_VIBRATION_PATTERN);
    };
    setIsCorrect(isAnswerCorrect);
    setModalVisible(true);
    dispatch(setQuestionAnswers(isAnswerCorrect));
  };

  const nextQuestion = async () => {
    dispatch(setQuestionNumber());
    setModalVisible(false);
    if (questionNumber === TOTAL_QUESTIONS_IN_ROUND) {
      setIsRoundEnd(true);
      setIsHideMainScreen(true);
    }
    resetImageLoadingState();
  };

  const onImageLoad = () => {
    setLoadedImageCount((prevCount) => prevCount + 1);
    if (loadedImageCount === TOTAL_QUESTION_BUTTONS - 1) {
      setAreImagesVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ opacity: isHideMainScreen ? 0 : 1 }}>
        <Text style={styles.text(colors.textPrimary)}>{questionNumber} / {TOTAL_QUESTIONS_IN_ROUND} </Text>
        <Text style={styles.text(colors.textPrimary)}>
          Which of these pictures did
          <Text style={styles.authorText(colors.highlightText)}> {questionData.author} </Text>
          paint?
        </Text>

        <DotIndicators questionAnswers={questionAnswers} />

        <AnswerImageButtons
          imagesData={imagesData}
          questionData={questionData}
          handlePressImageButton={handlePressImageButton}
          areImagesVisible={areImagesVisible}
          onImageLoad={onImageLoad}
        />

        <Modal
          isVisible={isModalVisible}
          backdropColor={isCorrect ? colors.correctAnswer : colors.incorrectAnswer}
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={QUESTION_ANIMATION_TIMING}
          animationOutTiming={QUESTION_ANIMATION_TIMING}
          backdropTransition={QUESTION_ANIMATION_TIMING}
          backdropTransitionOutTiming={QUESTION_ANIMATION_TIMING}
          onModalHide={() => setQuestionData(imagesData[(roundNumber * TOTAL_QUESTIONS_IN_ROUND) + questionNumber + PICTURES_ROUNDS * TOTAL_QUESTIONS_IN_ROUND])}
        >
          <AnswerPopUp questionData={questionData} nextQuestion={nextQuestion} />
        </Modal>
      </View>

      <Modal
        isVisible={isRoundEnd}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={QUESTION_ANIMATION_TIMING}
        animationOutTiming={QUESTION_ANIMATION_TIMING}
        backdropTransition={QUESTION_ANIMATION_TIMING}
        backdropTransitionOutTiming={QUESTION_ANIMATION_TIMING}
        onModalHide={() => {
          dispatch(setInitialState());
          dispatch(setCategoryName('Pictures'));
          navigation.goBack();
        }}
      >
        <CongratulationPopUp questionAnswers={questionAnswers} setIsRoundEnd={setIsRoundEnd} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  }, text: (color) => ({
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: color
  }), authorText: (color) => ({
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: color
  }),
  image: {
    width: '100%',
    height: '50%',
  }
});
