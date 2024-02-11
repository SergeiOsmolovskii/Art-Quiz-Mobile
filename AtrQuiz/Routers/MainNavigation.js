import { StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../theme/ThemeContext';
import { MainTabNavigation } from './ManiTabNavigation';
import { RoundsScreen } from '../screens/RoundsScreen';
import { GameScreen } from '../screens/GameScreen';
import { withTranslation } from '../HOC/withTranslation';

const Stack = createStackNavigator();

export const MainNavigation = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Main"
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
      <Stack.Screen name="Main" component={withTranslation(MainTabNavigation)} options={{ headerShown: false }} />
      <Stack.Screen name="Artists" component={RoundsScreen} />
      <Stack.Screen name="Pictures" component={RoundsScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
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