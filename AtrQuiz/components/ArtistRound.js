import { useEffect, useState} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { DotIndicators } from './DotIndicators';
import { AnswerButtons } from './AnswerButtons';
import { BASIC_IMAGE_URL, TOTAL_QUESTIONS_IN_ROUND, QUESTION_ANIMATION_TIMING } from '../utils/variables';
import { useSelector, useDispatch } from 'react-redux';
import { setQuestionAnswers, setQuestionNumber } from '../store/roundSlice';
import Modal from 'react-native-modal';
import { AnswerPopUp } from './AnswerPopUp';
import { CongratulationPopUp } from './CongratulationPopUp';
import { setInitialState, setCategoryName } from '../store/roundSlice';

export const ArtistRound = ({navigation}) => {
  const dispatch = useDispatch();
  const questionNumber = useSelector((state) => state.round.questionNumber);
  const questionAnswers = useSelector((state) => state.round.questionAnswers);
  const roundNumber = useSelector((state) => state.round.roundNumber);
  const imagesData = useSelector((state) => state.imagesData);

  const [questionData, setQuestionData] = useState(imagesData[(roundNumber * TOTAL_QUESTIONS_IN_ROUND) + questionNumber - 1]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isHideMainScreen, setIsHideMainScreen ] = useState(false)
  const [isRoundEnd, setIsRoundEnd] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handlePressButton = async (item) => {
    const isAnswerCorrect = item === questionData.author;
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
  }

  return (
    <View style={styles.container}>
        <View style={{opacity: isHideMainScreen ? 0 : 1}}>
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
            animationInTiming={QUESTION_ANIMATION_TIMING}
            animationOutTiming={QUESTION_ANIMATION_TIMING}
            backdropTransition={QUESTION_ANIMATION_TIMING}
            backdropTransitionOutTiming={QUESTION_ANIMATION_TIMING}
            onModalHide={() => setQuestionData(imagesData[(roundNumber * TOTAL_QUESTIONS_IN_ROUND) + questionNumber])}
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
            dispatch((setCategoryName('Artists')));
            navigation.navigate('Artists')}
          }
        >
          <CongratulationPopUp questionAnswers={questionAnswers} navigation={navigation} setIsRoundEnd={setIsRoundEnd} />
        </Modal>
        

    </View>
  )
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




// return (
//   <View style={styles.container}>
//     {isRoundEnd ? (
//       <Modal
//         isVisible={isRoundEnd}
//         backdropOpacity={0.8}
//         animationIn="zoomInDown"
//         animationOut="zoomOutUp"
//         animationInTiming={QUESTION_ANIMATION_TIMING}
//         animationOutTiming={QUESTION_ANIMATION_TIMING}
//         backdropTransition={QUESTION_ANIMATION_TIMING}
//         backdropTransitionOutTiming={QUESTION_ANIMATION_TIMING}
//         onModalHide={() => console.log(isRoundEnd)}
//       >
//         <CongratulationPopUp questionAnswers={questionAnswers} navigation={navigation} setIsRoundEnd={setIsRoundEnd} />
//       </Modal>
//     ) : (
//       <>
//         <Text style={styles.text}>{questionNumber} / {TOTAL_QUESTIONS_IN_ROUND} </Text>

//         <Text style={styles.text}>Who is the author of this picture?</Text>

//         <Image
//           style={styles.image}
//           source={{ uri: `${BASIC_IMAGE_URL}${questionData.imageNum}.jpg` }}
//           resizeMode='contain'
//           accessible={true}
//         />
//         <DotIndicators questionAnswers={questionAnswers} />

//         <AnswerButtons imagesData={imagesData} questionData={questionData} handlePressButton={handlePressButton} />

//         <Modal
//           isVisible={isModalVisible}
//           backdropColor={isCorrect ? 'green' : 'red'}
//           backdropOpacity={0.8}
//           animationIn="zoomInDown"
//           animationOut="zoomOutUp"
//           animationInTiming={QUESTION_ANIMATION_TIMING}
//           animationOutTiming={QUESTION_ANIMATION_TIMING}
//           backdropTransition={QUESTION_ANIMATION_TIMING}
//           backdropTransitionOutTiming={QUESTION_ANIMATION_TIMING}
//           onModalHide={() => setQuestionData(imagesData[(roundNumber * TOTAL_QUESTIONS_IN_ROUND) + questionNumber])}
//         >
//           <AnswerPopUp questionData={questionData} nextQuestion={nextQuestion} />
//         </Modal>
//       </>
//     )}
//   </View>
// )