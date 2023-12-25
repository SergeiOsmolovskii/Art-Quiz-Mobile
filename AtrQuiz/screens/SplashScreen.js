import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export const SplashScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.splashScreenBackground }]}>
      <Image
        style={styles.image}
        source={require('../assets/images/logo.png')}
        resizeMode='contain'
        accessible={true}
        accessibilityLabel={'Little Lemon Logo'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: '90%',
    width: '90%',
  }
});