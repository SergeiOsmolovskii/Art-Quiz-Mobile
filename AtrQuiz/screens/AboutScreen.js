import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Accordions } from '../components/accordion/Accordion';

export const AboutScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container(colors.background)}>
      <View>
        <Text style={styles.text(colors.textPrimary)} >
          Welcome to the "Art Quiz" - an exciting journey into the world of fine art!
          This quiz provides the opportunity to enjoy the magic of artistic creativity during exciting rounds.
          You have to unravel the secrets of the mastery of great artists.
          Prepare for an inspiring exploration experience that will expose you to the many facets of artistic expression.
        </Text>
      </View>
      <Text style={styles.textTitle(colors.textPrimary)}>Rounds</Text>
      <ScrollView style={styles.accordionContainer}>
        <Accordions />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: backgroundColor,
  }), text: (color) => ({
    textAlign: 'justify',
    fontSize: 18,
    fontWeight: 'bold',
    color: color
  }), textTitle: (color) => ({
    fontSize: 26,
    fontWeight: 'bold',
    color: color
  }), accordionContainer: {
    flex: 1,
    paddingVertical: 20,
  }
});