import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ICONS = {
  chevronDown: 'chevron-down-circle-outline',
  chevronUp: 'chevron-up-circle-outline',
};

export const AccordionItem = ({ title, content, backgroundColor, iconColor }) => {

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [contentHeight, setContentHeight] = useState(new Animated.Value(0));

  const toggleAccordion = () => {
    const newHeight = isCollapsed ? calculateContentHeight() : 0;

    Animated.timing(contentHeight, {
      toValue: newHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsCollapsed(!isCollapsed);
  };


  const calculateContentHeight = () => {
    return 200;
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleAccordion}>
        <View style={styles.accordionHeader(backgroundColor, iconColor)}>
          <Text style={styles.title}>{title}</Text>
          {isCollapsed ?
            <Ionicons name={ICONS.chevronDown} size={30} color={iconColor} /> : <Ionicons name={ICONS.chevronUp} size={30} color={iconColor} />
          }
        </View>
      </TouchableOpacity>
      <Animated.View style={[styles.accordionContent(backgroundColor, iconColor), { height: contentHeight }]}>
        <View style={{ padding: 10 }}>
          <Text style={styles.text}>{content}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  accordionHeader: (backgroundColor, iconColor) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: backgroundColor,
    borderBottomWidth: 3,
    borderColor: iconColor,
  }),
  title: {
    fontSize: 20
  },
  text: {
    textAlign: 'justify',
    fontSize: 18,
  },
  accordionContent: (backgroundColor) => ({
    overflow: 'hidden',
    backgroundColor: backgroundColor,
  })
});