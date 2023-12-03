import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

export const ProgressBar = ({ progress, width, height, duration, background }) => {

  const AnimatedRect = Animated.createAnimatedComponent(Rect);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const newWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width],
  });

  const interpolateColor = animatedValue.interpolate({
    inputRange: [0, 0.3, 0.7, 1],
    outputRange: ['red', 'red', 'orange', 'green'],
  });

  useEffect(() => {
    const animate = () => {
      animatedValue.setValue(0);

      Animated.timing(animatedValue, {
        toValue: progress / 100,
        duration: duration || 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    };

    animate();

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [progress, animatedValue, duration]);

  return (
    <View style={styles.container}>
      <Svg width={width} height={height} >
        <Rect width={width} height={height} fill={background} />
        <AnimatedRect width={newWidth} height={height} fill={interpolateColor} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});