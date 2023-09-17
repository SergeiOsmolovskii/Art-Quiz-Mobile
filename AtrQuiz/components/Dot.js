import { StyleSheet, View } from 'react-native';

export const Dot = ({ color }) => {
  const dotStyle = { backgroundColor: color };
  return <View style={[styles.dot, dotStyle]}></View>
}

const styles = StyleSheet.create({
  dot: {
    height: 15,
    width: 15,
    borderRadius: 50,
  }
});