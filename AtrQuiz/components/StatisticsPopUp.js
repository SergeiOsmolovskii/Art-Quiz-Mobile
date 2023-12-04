import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { CircularProgressBar } from './progressBar/CircularProgressBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const StatisticsPopUp = ({ selectedRoundData, setModalVisible }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container(colors.popupBackground)}>
      <Text style={styles.title(colors.textPrimary)}>
        {selectedRoundData.title}
      </Text>
      <View style={styles.progressBar}>
        <CircularProgressBar progress={selectedRoundData.progress} radius={120} strokeWidth={30} fz={48} duration={1000} />
      </View>
      {
        (selectedRoundData.attemptsToBestResult)
        ?
          <View style={styles.rowContainer(colors.textPrimary)}>
            <Text style={styles.text(colors.textPrimary)}>Attempts to best result</Text>
            <Text style={styles.text(colors.textPrimary)}>{selectedRoundData.attemptsToBestResult}</Text>
          </View>
        : null
      }
      <View style={styles.rowContainer(colors.textPrimary)}>

        <Text style={styles.text(colors.textPrimary)}>Attempts</Text>
        <Text style={styles.text(colors.textPrimary)}>{selectedRoundData.attempts}</Text>
      </View>
      <View style={styles.rowContainer(colors.textPrimary)}>
        <Text style={styles.text(colors.textPrimary)}>Best time</Text>
        <Text style={styles.text(colors.textPrimary)}>{selectedRoundData.bestTime}</Text>
      </View>
      <TouchableOpacity style={styles.button(colors.backButton)} onPress={() => setModalVisible(false)} >
        <Text style={styles.buttonText(colors.textPrimary)}>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    backgroundColor,
  }),
  progressBar: {
    alignItems: 'center',
  },
  title: (color) => ({
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: color
  }),
  text: (color) => ({
    marginVertical: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: color
  }),
  rowContainer: (color) => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomColor: color,
    borderBottomWidth: 2,
  }),
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
