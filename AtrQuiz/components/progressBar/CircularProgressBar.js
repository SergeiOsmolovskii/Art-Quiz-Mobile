import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import { rgbaToHex } from '../../utils/helpers';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
export const CircularProgressBar = ({ progress, radius, strokeWidth, fz, duration }) => {

  const circumFerence = 2 * Math.PI * (radius - strokeWidth / 2);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayText, setDisplayText] = useState('0%');

  const offset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumFerence, 0],
  });

  const interpolateColor = animatedValue.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: ['red', 'orange', 'green'],
  });

  const strokeColor = rgbaToHex(interpolateColor.__getValue(progress / 100));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress / 100,
      duration: duration || 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    animatedValue.addListener(({ value }) => {
      const roundedValue = Math.round(value * 100);
      setDisplayText(`${roundedValue}%`);
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [animatedValue, interpolateColor, progress, duration]);

  return (
    <View>
      <Svg width={radius * 2} height={radius * 2} >
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="transparent"
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="transparent"
          transform={`rotate(-90 ${radius} ${radius})`}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumFerence}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <G >
          <SvgText
            x={radius}
            y={radius}
            fontSize={fz}
            fill="#3498db"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {`${displayText}`}
          </SvgText>
        </G>
      </Svg>
    </View>
  );
};