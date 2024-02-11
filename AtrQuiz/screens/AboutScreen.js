import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Accordions } from '../components/accordion/Accordion';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export const AboutScreen = ({ t }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container(colors.background)}>
      <View>
        <Text style={styles.text(colors.textPrimary)}> {t('about.description')}</Text>
      </View>
      <Text style={styles.textTitle(colors.textPrimary)}>{t('about.rounds')}</Text>
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
  }),
  text: (color) => ({
    textAlign: 'justify',
    fontSize: 18,
    fontWeight: 'bold',
    color: color
  }),
  textTitle: (color) => ({
    fontSize: 26,
    fontWeight: 'bold',
    color: color
  }),
  accordionContainer: {
    flex: 1,
    paddingVertical: 20,
  }
});