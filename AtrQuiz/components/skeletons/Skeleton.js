import { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export const Skeleton = ({ width, height, marginBottom, marginTop }) => {
  const opacity = useRef(new Animated.Value(0.3));
  const { colors } = useTheme();

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return <Animated.View style={[{ opacity: opacity.current, height, width, marginBottom, marginTop }, styles.skeleton(colors.skeletonBackground)]} />;
};

const styles = StyleSheet.create({
  skeleton: (backgroundColor) => ({
    backgroundColor: backgroundColor
  }),
});