import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

export const CircularProgressBar = ({ progress, radius, strokeWidth, fz, duration }) => {
  
  const circumference = 2 * Math.PI * (radius - strokeWidth / 2);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayText, setDisplayText] = useState('0%');
  const offset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
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

    animatedValue.addListener(({ value }) => {
      const roundedValue = Math.round(value * 100);
      setDisplayText(`${roundedValue}%`);
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [progress, animatedValue, duration]);



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
          stroke={interpolateColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <G>
          <SvgText
            x={radius}
            y={radius}
            fontSize={fz}
            fill="#3498db"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {displayText}
          </SvgText>
        </G>
      </Svg>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'orange'
  },
  progressText: {
    fontSize: 80,
    // width: 200,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 80,
    width: 200 * 0.7,
    height: 60,
    backgroundColor: 'green',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
  },
  circle: {
    transform: 'rotate: 90deg'
  }
});

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'orange',
//   }, animationContainer: {
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: (textColor) => ({
//     margin: 10,
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: textColor,
//   }),
//   text: (textColor) => ({
//     marginHorizontal: 5,
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: textColor,
//   }),
// });