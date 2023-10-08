import { useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, Image } from 'react-native';
import { DotIndicators } from './DotIndicators';
import { AnswerButtons } from './AnswerButtons';
import { BASIC_IMAGE_URL, TOTAL_QUESTIONS_IN_ROUND } from '../utils/variables';
import { useSelector, useDispatch } from 'react-redux';
import { setQuestionAnswers, setQuestionNumber, setInitialState } from '../store/gameSlice';
import Modal from 'react-native-modal';
import { AnswerPopUp } from './AnswerPopUp';
import { CongratulationPopUp } from './CongratulationPopUp';

export const ArtistRound = ({navigation}) => {
  const questionNumber = useSelector((state) => state.game.questionNumber);
  const questionAnswers = useSelector((state) => state.game.questionAnswers);
  const roundNumber = useSelector((state) => state.game.roundNumber);
  const imagesData = useSelector((state) => state.imagesData);
  const dispatch = useDispatch();

  const [questionData, setQuestionData] = useState(imagesData[(roundNumber * TOTAL_QUESTIONS_IN_ROUND) + questionNumber - 1]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRoundEnd, setIsRoundEnd] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handlePressButton = (item) => {
    const isAnswerCorrect = item === questionData.author;
    setIsCorrect(isAnswerCorrect);
    setModalVisible(true);
    dispatch(setQuestionAnswers(isAnswerCorrect));
  };

  const nextQuestion = async () => {
    if (questionNumber !== TOTAL_QUESTIONS_IN_ROUND) {
      dispatch(setQuestionNumber());
      setQuestionData(imagesData[(roundNumber * TOTAL_QUESTIONS_IN_ROUND) + questionNumber]);
      setModalVisible(false);
    } else {
      setModalVisible(false);
      setIsRoundEnd(true);
      await endRound();
    }
  }

  const endRound = async () => {
    try {
      const storage = await AsyncStorage.getItem('storage');
      const data = JSON.parse(storage);

      const prevResult = data.artistsRounds[roundNumber] ? data.artistsRounds[roundNumber].reduce((accum, current) => current === true ? accum += 1 : accum, 0) : 0;
      const currentResult = questionAnswers.reduce((accum, current) => current === true ? accum += 1 : accum, 0);

      if (currentResult > prevResult) {
        data.artistsRounds[roundNumber] = questionAnswers;
        AsyncStorage.setItem('storage', JSON.stringify(data));
      }
      setInitialState();
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{questionNumber} / {TOTAL_QUESTIONS_IN_ROUND} </Text>

      <Text style={styles.text}>Who is the author of this picture?</Text>

      <Image
        style={styles.image}
        source={{ uri: `${BASIC_IMAGE_URL}${questionData.imageNum}.jpg` }}
        resizeMode='contain'
        accessible={true}
      />
      <DotIndicators questionAnswers={questionAnswers} />

      <AnswerButtons imagesData={imagesData} questionData={questionData} handlePressButton={handlePressButton} />

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
      >
        <AnswerPopUp questionData={questionData} nextQuestion={nextQuestion}/>
      </Modal>

      <Modal
        isVisible={isRoundEnd}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransition={1000}
        backdropTransitionOutTiming={1000}
      >
        <CongratulationPopUp questionAnswers={questionAnswers} navigation={navigation}/>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'orange',
  }, text: {
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }, image: {
    width: '100%',
    height: '50%'
  }
});