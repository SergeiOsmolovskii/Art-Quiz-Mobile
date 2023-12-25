import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsScreen } from './../screens/SettingsScreen';
import { AboutScreen } from './../screens/AboutScreen';
import { StyleSheet, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeScreen } from '../screens/HomeScreen';
import { StatisticsStackNavigation } from './StatisticsStackNavigation';

const Tab = createBottomTabNavigator();

export const MainTabNavigation = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
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
        tabBarStyle: {
          backgroundColor: colors.tabBackground
        },
        tabBarInactiveTintColor: colors.navigationIconsInactive,
        tabBarActiveTintColor: colors.navigationIconsActive,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Stats" component={StatisticsStackNavigation}  options={{ headerShown: false }}/>
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 80,
    marginRight: 15
  }
});