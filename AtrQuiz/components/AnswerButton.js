import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export const AnswerButton = ({ item, handlePressButton }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={styles.button(colors.answerButton)}
      onPress={() => handlePressButton(item)}
    >
      <Text style={styles.buttonText(colors.textPrimary)}>{item !== undefined ? item.toString() : ""}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: (backgroundColor) => ({
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '45%',
    minHeight: 60,
    marginVertical: 10,
    padding: 10,
    backgroundColor: backgroundColor,
  }), buttonText: (color) => ({
    textAlign: 'center',
    textTransform: 'none',
    fontWeight: 'bold',
    color: color
  })
});