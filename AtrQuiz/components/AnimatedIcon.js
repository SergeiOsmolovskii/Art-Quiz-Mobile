import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
  const { x, y } = calculatePosition(index);

  return (
    <View
      style={[
        styles.iconContainer,
        {
          left: circleRadius - iconSize / 2,
          top: circleRadius - iconSize / 2,
          transform: [{ translateX: x }, { translateY: y }],
        },
      ]}
    >
      <Ionicons name={iconsName} size={iconSize} color={'yellow'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '50%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  iconContainer: {
    position: 'absolute',
  },
  text: {
    textAlign: 'center',
    fontSize: 36,
  },
});