import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TOTAL_QUESTIONS_IN_ROUND } from '../utils/variables';
import { useDispatch, useSelector } from 'react-redux';
import { setRoundNumber, setQuestionNumber } from '../store/roundSlice';
import { setAttempts } from '../store/gameSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';

export const Round = ({ roundNumber, rating, prevRoundRating }) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const categoryName = useSelector((state) => state.round.categoryName);

  const handelSelectRound = async () => {
    dispatch(setRoundNumber(roundNumber));
    dispatch(setQuestionNumber(1));
    dispatch(setAttempts({ roundType: categoryName, roundNumber: roundNumber }));
    const storage = await AsyncStorage.getItem('storage');
    const storedData = JSON.parse(storage);
    storedData.roundsData[categoryName].data[roundNumber].attempts += 1;
    AsyncStorage.setItem('storage', JSON.stringify(storedData));
    navigation.navigate('Game', { categoryName: categoryName });
  }

  const StarIcon = () => {
    const iconName =
      rating === 10 ? 'star-sharp' :
        rating >= 5 ? 'star-half-sharp' :
          'star-outline';
    return <Ionicons style={styles.icon} name={iconName} size={30} color={'yellow'} />;
  }

  return (
    <TouchableOpacity
      disabled={roundNumber > 0 && prevRoundRating < 6}
      style={[styles.button(colors.roundButton, colors.borderColor), (roundNumber > 0 && prevRoundRating < 6) && styles.disabledButton(colors.disabledButton)]}
      onPress={() => handelSelectRound()}
    >
      <Text style={styles.title(colors.textPrimary)}>{categoryName} round {roundNumber + 1}</Text>
      <View style={styles.resultContainer} >
        <Text style={styles.text(colors.textPrimary)}>{rating}</Text>
        <Text style={styles.text(colors.textPrimary)}>/</Text>
        <Text style={styles.text(colors.textPrimary)}>{TOTAL_QUESTIONS_IN_ROUND}</Text>
        <StarIcon />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: (backgroundColor, borderColor) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    marginVertical: 10,
    backgroundColor: backgroundColor,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: borderColor,
  }),
  disabledButton: (disabledButton) => ({
    backgroundColor: disabledButton,
  }),
  resultContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }, title: (textColor) => ({
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: textColor
  }), text: (textColor) => ({
    marginHorizontal: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: textColor
  }), icon: {
    marginHorizontal: 10
  }
});