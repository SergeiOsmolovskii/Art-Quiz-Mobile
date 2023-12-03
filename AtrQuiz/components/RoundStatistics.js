import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { RoundStatisticItem } from './RoundStatisticItem';
import { useSelector } from 'react-redux';
import { TOTAL_QUESTIONS_IN_ROUND } from '../utils/variables';

export const RoundStatistics = ({ route }) => {
  const { colors } = useTheme();
  const state = useSelector((state) => state.game.roundsData[route.params.categoryName].data);
  const preparedData = state?.map((item, index) => {
    return (
      {
        id: `${route.params.categoryName} ${index}`,
        title: `${route.params.categoryName} round ${index + 1}`,
        progress: item.answers ? item.answers.reduce((accum, current) => current === true ? accum += 1 : accum, 0) * 100 / TOTAL_QUESTIONS_IN_ROUND : 0
      }
    )
  });

  const renderItems = preparedData.map((item) => {
    return (<RoundStatisticItem roundName={item.title} progress={item.progress} key={item.id}/>);
  });

  return (
    <ScrollView style={styles.container(colors.roundBackground)}>
      {renderItems}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor,
  }),
  text: (textColor) => ({
    marginHorizontal: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: textColor
  }),
});