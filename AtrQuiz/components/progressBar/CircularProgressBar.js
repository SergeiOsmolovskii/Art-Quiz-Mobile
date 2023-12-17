import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

export const CircularProgressBar = ({ progress, radius, strokeWidth, fz, duration }) => {

  const circumFerence = 2 * Math.PI * (radius - strokeWidth / 2);
  const strokeDashoffset = circumFerence - circumFerence * progress / 100;

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
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="transparent"
          stroke={'green'}
          transform={`rotate(-90 ${radius} ${radius})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumFerence}
          strokeDashoffset={strokeDashoffset}
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
            {`${progress}%`}
          </SvgText>
        </G>
      </Svg>
    </View>
  );
};


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