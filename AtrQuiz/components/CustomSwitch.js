import { View, TouchableOpacity, Animated, StyleSheet, Easing } from 'react-native';

export const CustomSwitch = ({ value, borderColor, enebleColor, disableColor, onToggle }) => {
  const animation = new Animated.Value(value ? 1 : 0);

  const toggleSwitch = () => {
    Animated.timing(animation, {
      toValue: value ? 0 : 1,
      duration: 500,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false,
    }).start(() => {
      onToggle(!value);
    });
  };

  const circleTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 40],
  });

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [disableColor, enebleColor],
  });

  return (
    <TouchableOpacity onPress={toggleSwitch}>
        <View style={[styles.switchContainer, { borderColor: borderColor }]}>
        <Animated.View style={[styles.circle, { backgroundColor, transform: [{ translateX: circleTranslateX }], borderColor }]}>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 80,
    height: 40,
    borderRadius: 40,
    borderWidth: 3,
    justifyContent: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 3,
    position: 'absolute',
  },
});