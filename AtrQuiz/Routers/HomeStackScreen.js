import { StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { RoundsScreen } from '../screens/RoundsScreen';
import { GameScreen } from '../screens/GameScreen';
import { useTheme } from '../theme/ThemeContext';

const HomeStack = createStackNavigator();

export const HomeStackScreen = () => {
  const { colors } = useTheme();

  return (
    <HomeStack.Navigator
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
      <HomeStack.Screen name="Main" component={HomeScreen} />
      <HomeStack.Screen name="Artists" component={RoundsScreen} />
      <HomeStack.Screen name="Pictures" component={RoundsScreen} />
      <HomeStack.Screen name="Game" component={GameScreen} />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 80,
    marginRight: 15
  }
});