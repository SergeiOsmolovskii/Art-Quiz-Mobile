import { StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { BUTTONS_ARR } from '../utils/variables';

export const StatisticsScreen = ({ t }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const goToStatistics = (categoryName) => {
    navigation.navigate('Stat', { categoryName: categoryName });
  }

  return (
    <View style={styles.container(colors.background)}>
      <View style={styles.rowContainer}>
        {BUTTONS_ARR.map((item) => (
          <TouchableOpacity style={styles.button} key={item.title} onPress={() => goToStatistics(item.title)}>
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