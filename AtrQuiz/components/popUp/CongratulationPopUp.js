import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setRoundsData } from '../../store/gameSlice';
import { setIsCorrectEnd } from '../../store/roundSlice';
import { AnimatedIcon } from '../AnimatedIcon';
import { TOTAL_QUESTIONS_IN_ROUND, CIRCLE_STARS_RADIUS } from '../../utils/variables';
import { useTheme } from '../../theme/ThemeContext';

export const CongratulationPopUp = ({ questionAnswers, setIsRoundEnd }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const categoryName = useSelector((state) => state.round.categoryName);
  const rounds = useSelector((state) => state.game.roundsData[categoryName].data);
  const roundNumber = useSelector((state) => state.round.roundNumber);
  const attempts = useSelector((state) => state.game.roundsData[categoryName].data[roundNumber].attempts);
  const isBestResult = useSelector((state) => state.game.roundsData[categoryName].data[roundNumber].attemptsToBestResult);
  const correctAnswersCount = questionAnswers.reduce((accum, current) => current === true ? accum += 1 : accum, 0);

  const icons = Array.from({ length: TOTAL_QUESTIONS_IN_ROUND }).map((_, index) => {
    const iconName = index < correctAnswersCount ? 'star-sharp' : 'star-outline';
    return (
      <AnimatedIcon key={index} index={index} iconsName={iconName} />
    );
  });

  const endRound = async () => {
    try {
      const storage = await AsyncStorage.getItem('storage');
      const data = JSON.parse(storage);
      const prevResult = rounds[roundNumber].answers ? rounds[roundNumber].answers.reduce((accum, current) => current === true ? accum += 1 : accum, 0) : 0;
      const currentResult = questionAnswers.reduce((accum, current) => current === true ? accum += 1 : accum, 0);

      if (currentResult > prevResult) {
        data.roundsData[categoryName].data[roundNumber].answers = questionAnswers;

        if (!Boolean(isBestResult) && currentResult === TOTAL_QUESTIONS_IN_ROUND) {
          data.roundsData[categoryName].data[roundNumber].attemptsToBestResult = attempts;
        };

        AsyncStorage.setItem('storage', JSON.stringify(data));
        dispatch(setRoundsData(categoryName, data.roundsData[categoryName]));
      }
      setIsRoundEnd(false);
      dispatch(setIsCorrectEnd(true));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container(colors.congratulationBackground)}>
      <Text style={styles.text}>Congratulations!</Text>
      <View style={styles.circle}>
        <Text style={styles.text}>{correctAnswersCount} / {TOTAL_QUESTIONS_IN_ROUND}</Text>
        {icons}
      </View>
      <TouchableOpacity style={styles.button(colors.nextButton)} onPress={endRound}>
        <Text style={styles.text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    padding: 20,
    height: '50%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: backgroundColor,
  }),
  circle: {
    width: 2 * CIRCLE_STARS_RADIUS,
    height: 2 * CIRCLE_STARS_RADIUS,
    position: 'relative',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 36,
  },
  button: (backgroundColor) => ({
    width: '100%',
    justifyContent: 'center',
    backgroundColor: backgroundColor,
  })
});