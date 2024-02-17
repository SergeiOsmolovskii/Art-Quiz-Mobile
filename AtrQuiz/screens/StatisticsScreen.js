import { StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { useSelector } from 'react-redux';
import { BUTTONS_ARR } from '../utils/variables';

export const StatisticsScreen = ({ t }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const localization = useSelector((state) => state.game.settings.localization);

  const goToStatistics = (categoryName, roundName) => {
    navigation.navigate('Stat', { categoryName: categoryName, roundName: roundName });
  }

  return (
    <View style={styles.container(colors.background)}>
      <View style={styles.rowContainer}>
        {BUTTONS_ARR[localization].map((item) => (
          <TouchableOpacity style={styles.button} key={item.title} onPress={() => goToStatistics(item.route, item.title)}>
            <ImageBackground
              source={item.url}
              style={styles.image}
              resizeMode='cover'
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    flex: 1,
    width: '100%',
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor,
  }),
  image: {
    height: '100%',
    width: '100%'
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 30
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: 125,
  },
});