import { useState } from 'react';
import { StyleSheet, View, Text, Image, Vibration, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { BASIC_IMAGE_URL, TOTAL_QUESTIONS_IN_ROUND, QUESTION_ANIMATION_TIMING, CORRECT_ANSWER_VIBRATION_PATTERN, INCORRECT_ANSWER_VIBRATION_PATTERN } from '../utils/variables';
import { setQuestionAnswers, setQuestionNumber } from '../store/roundSlice';
import { setInitialState, setCategoryName } from '../store/roundSlice';
import { CongratulationPopUp } from './popUp/CongratulationPopUp';
import { AnswerPopUp } from './popUp/AnswerPopUp';
import { useTheme } from '../theme/ThemeContext';
import { DotIndicators } from './DotIndicators';
import { AnswerButtons } from './AnswerButtons';
import { ArtistsRoundSkeleton } from './skeletons/ArtistsRoundSkeleton';

export const ArtistRound = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const questionNumber = useSelector((state) => state.round.questionNumber);
  const questionAnswers = useSelector((state) => state.round.questionAnswers);
  const roundNumber = useSelector((state) => state.round.roundNumber);
  const imagesData = useSelector((state) => state.imagesData);
  const vibration = useSelector((state) => state.game.settings.vibration);

  const [questionData, setQuestionData] = useState(imagesData[(roundNumber * TOTAL_QUESTIONS_IN_ROUND) + questionNumber - 1]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isHideMainScreen, setIsHideMainScreen] = useState(false);
  const [isImagesVisible, setIsImagesVisible] = useState(false);
  const [isRoundEnd, setIsRoundEnd] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handlePressButton = async (item) => {
    const isAnswerCorrect = item === questionData.author;
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
    setIsImagesVisible(false);
    if (questionNumber === TOTAL_QUESTIONS_IN_ROUND) {
      setIsRoundEnd(true);
      setIsHideMainScreen(true);
    }
  };

  return (
    <View style={styles.container}>

      {!isImagesVisible && !isHideMainScreen ? <ArtistsRoundSkeleton/> : null}

      <View style={{ opacity: isImagesVisible && !isHideMainScreen ? 1 : 0 }}>
        <Text style={styles.text(colors.textPrimary)}>{questionNumber} / {TOTAL_QUESTIONS_IN_ROUND} </Text>
        <Text style={styles.text(colors.textPrimary)}>Who is the author of this picture?</Text>
        <Image
          style={styles.image}
          source={{ uri: `${BASIC_IMAGE_URL}${questionData.imageNum}.jpg` }}
          resizeMode='contain'
          accessible={true}
          onLoad={() => setIsImagesVisible(true)}
        />
        <DotIndicators questionAnswers={questionAnswers} />
        <AnswerButtons imagesData={imagesData} questionData={questionData} handlePressButton={handlePressButton} />
      </View>

      <Modal
        isVisible={isModalVisible}
        statusBarTranslucent
        deviceHeight={height + 55}
        backdropColor={isCorrect ? colors.correctAnswer : colors.incorrectAnswer}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={QUESTION_ANIMATION_TIMING}
        animationOutTiming={QUESTION_ANIMATION_TIMING}
        backdropTransition={QUESTION_ANIMATION_TIMING}
        backdropTransitionOutTiming={QUESTION_ANIMATION_TIMING}
        onModalHide={() => setQuestionData(imagesData[(roundNumber * TOTAL_QUESTIONS_IN_ROUND) + questionNumber])}
      >
        <AnswerPopUp questionData={questionData} nextQuestion={nextQuestion} />
      </Modal>

      <Modal
        isVisible={isRoundEnd}
        statusBarTranslucent
        deviceHeight={height + 55}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={QUESTION_ANIMATION_TIMING}
        animationOutTiming={QUESTION_ANIMATION_TIMING}
        backdropTransition={QUESTION_ANIMATION_TIMING}
        backdropTransitionOutTiming={QUESTION_ANIMATION_TIMING}
        onModalHide={() => {
          dispatch(setInitialState());
          dispatch((setCategoryName('Artists')));
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
  },
  text: (color) => ({
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: color
  }),
  image: {
    width: '100%',
    height: '50%',
  }
});
