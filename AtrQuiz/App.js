import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SplashScreen } from './screens/SplashScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AboutScreen } from './screens/AboutScreen';
import { StatisticsScreen } from './screens/StatisticsScreen';
import { HomeStackScreen } from './Routers/HomeStackScreen';
import { ARTISTS_ROUNDS, PICTURES_ROUNDS, TOTAL_QUESTIONS_IN_ROUND } from './utils/variables'

const Tab = createBottomTabNavigator();

export default function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const storage = await AsyncStorage.getItem('storage');
        if (!storage) {
          const data = {
            artistsRonuds: Array.from({ length: ARTISTS_ROUNDS }, () => null),
            picturesRonuds: Array.from({ length: PICTURES_ROUNDS }, () => null),
            sessionStorage: {
              category: '',
              categoryGroup: '',
              questionGroup: '',
              currentQuestion: '',
              questionsAnswers: Array.from({ length: TOTAL_QUESTIONS_IN_ROUND }, () => null)
            },
            settings: {},
          };
          AsyncStorage.setItem('storage', JSON.stringify(data));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return isLoading ? (
    <SplashScreen />
  ) : (

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerRight: () => (
            <Image
              style={styles.image}
              source={require('./assets/images/logo.png')}
              resizeMode='cover'
              accessible={true}
            />
          ),
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home-sharp' : 'home-outline';
                break;
              case 'Stats':
                iconName = focused ? 'star-sharp' : 'star-outline';
                break;
              case 'Settings':
                iconName = focused ? 'settings-sharp' : 'settings-outline';
                break;
              case 'About':
                iconName = focused ? 'information-circle' : 'information-circle-outline';
                break;
              default:
                break;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'tomato',
        })}
      >

        <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Stats" component={StatisticsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="About" component={AboutScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 50,
    width: 80,
    marginRight: 15
  }
});
