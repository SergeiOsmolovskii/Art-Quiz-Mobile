import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export const ProgressBar = ({ progress, width, height, duration, background }) => {
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
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: progress / 100,
        duration: duration || 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

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
    flex: 1
  },
});