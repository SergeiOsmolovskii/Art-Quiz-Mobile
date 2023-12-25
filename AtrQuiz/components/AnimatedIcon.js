import { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { TOTAL_QUESTIONS_IN_ROUND } from '../utils/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';

const circleRadius = 100;
const iconSize = 30;

const calculatePosition = (index) => {
  const angle = (360 / TOTAL_QUESTIONS_IN_ROUND) * index;
  const radians = ((angle - 90) * Math.PI) / 180;
  const x = circleRadius * Math.cos(radians);
  const y = circleRadius * Math.sin(radians);
  return { x, y };
};

export const AnimatedIcon = ({ index, iconsName }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const { x, y } = calculatePosition(index);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: index * 200,
      useNativeDriver: false,
    }).start();
  }, [index, opacity]);

  return (
    <Animated.View
      style={[
        styles.iconContainer,
        {
          left: circleRadius - iconSize / 2,
          top: circleRadius - iconSize / 2,
          transform: [{ translateX: x }, { translateY: y }],
          opacity: opacity
        },
      ]}
    >
      <Ionicons name={iconsName} size={iconSize} color={'yellow'}/>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
  },
});