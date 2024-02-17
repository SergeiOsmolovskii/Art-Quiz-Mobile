import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { BASIC_IMAGE_URL } from '../../utils/variables';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';

export const AnswerPopUp = ({ questionData, nextQuestion }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container(colors.popupBackground)}>
      <Text style={styles.text(colors.textPrimary)}>{questionData.author}</Text>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: `${BASIC_IMAGE_URL}${questionData.imageNum}.jpg` }}
          resizeMode="cover"
        />
      </View>

      <View>
        <Text style={styles.text(colors.textPrimary)}>{questionData.name}</Text>
        <Text style={styles.text(colors.textPrimary)}>{questionData.year}</Text>
      </View>

      <TouchableOpacity style={styles.button(colors.nextButton)} onPress={nextQuestion}>
        <Text style={styles.buttonText(colors.textPrimary)}>{t('answerPopUp.next')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: backgroundColor,
  }),
  text: (color) => ({
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: color
  }),
  imageContainer: {
    width: '50%',
    aspectRatio: 1,
    borderRadius: 30,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: (backgroundColor) => ({
    width: '100%',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: backgroundColor,
  }),
  buttonText: (color) => ({
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: color
  }),
});