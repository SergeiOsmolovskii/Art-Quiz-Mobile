import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from './layout/Header';
import { SplashScreen } from './screens/SplashScreen';



export default function App() {
  return (
  <>
    {/* <Header/> */}
    <SplashScreen/>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
