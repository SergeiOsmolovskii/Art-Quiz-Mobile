import 'react-native-gesture-handler';
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../theme/ThemeContext';
import { StatisticsScreen } from '../screens/StatisticsScreen';
import { RoundStatistics } from '../components/RoundStatistics';

const Stack = createStackNavigator();

export const StatisticsStackNavigation = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Statistic"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.headerBackground,
        },
        headerRight: () => (
          <Image
            style={styles.image}
            source={require('./../assets/images/logo.png')}
            resizeMode='cover'
            accessible={true}
          />
        ),
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.textPrimary
        },
        headerTitleAlign: 'center',
        headerTintColor: colors.textPrimary
      }}
      >
      <Stack.Screen name="Statistic" component={StatisticsScreen} />
      <Stack.Screen name="ArtistStat" component={RoundStatistics} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 80,
    marginRight: 15
  }
});