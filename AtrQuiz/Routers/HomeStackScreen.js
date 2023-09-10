import { StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { RoundsScreen } from '../screens/RoundsScreen';

const HomeStack = createStackNavigator();

export const HomeStackScreen = () => {

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'tomato',
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
          fontWeight: 'bold'
        },
        headerTitleAlign: 'center',

      }}
    >
      <HomeStack.Screen name="Main" component={HomeScreen} />
      <HomeStack.Screen name="Artists" component={RoundsScreen} />
      <HomeStack.Screen name="Pictures" component={RoundsScreen} />
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