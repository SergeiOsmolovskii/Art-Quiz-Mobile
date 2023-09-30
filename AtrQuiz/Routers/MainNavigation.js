import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsScreen } from './../screens/SettingsScreen';
import { AboutScreen } from './../screens/AboutScreen';
import { StatisticsScreen } from './../screens/StatisticsScreen';
import { HomeStackScreen } from './HomeStackScreen';
import { StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const MainNavigation = () => {

  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
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
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false, unmountOnBlur: true }} />
        <Tab.Screen name="Stats" component={StatisticsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
  )
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