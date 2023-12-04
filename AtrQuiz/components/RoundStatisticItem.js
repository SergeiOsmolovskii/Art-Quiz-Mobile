import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { ProgressBar } from './progressBar/ProgressBar';

export const RoundStatisticItem = ({ roundName, progress, handelSelectStatistics }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={styles.button(colors.roundButton, colors.borderColor)}
      onPress={() => handelSelectStatistics()}
    >
      <Text style={styles.title(colors.textPrimary)}>{roundName}</Text>
      <View style={styles.statisticContainer} >
        <ProgressBar progress={progress} width={130} height={20} duration={1000} background={colors.progressBarBackground}/>
        <Text style={styles.title(colors.textPrimary)}>{progress}%</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: (backgroundColor, borderColor) => ({
    flex:1,
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
  statisticContainer: {
    flex: 1,
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