import 'react-native-gesture-handler';
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../theme/ThemeContext';
import { StatisticsScreen } from '../screens/StatisticsScreen';
import { RoundStatistics } from '../components/RoundStatistics';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export const StatisticsStackNavigation = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const localization = useSelector((state) => state.game.settings.localization);

  return (
    <Stack.Navigator
      initialRouteName="Statistics"
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
      <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ title: t('tabs.stats')}}/>
      <Stack.Screen name="Stat" component={RoundStatistics}/>
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