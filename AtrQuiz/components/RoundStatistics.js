import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, Animated, Text, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { CircularProgressBar } from './progressBar/CircularProgressBar';
import { RoundStatisticItem } from './RoundStatisticItem';

export const RoundStatistics = ({ route }) => {
  const { colors } = useTheme();

  console.log(route.params.categoryName);

  const GAME_ROUNDS = Array.from({ length: 12 }).map((_, index) => ({
    roundName: route.params.categoryName + index + 1,
    id: route.params.categoryName + (index + 1),
    progress: 50
  }));

  const renderItem = (item) => {
    console.log(item)
    return(
      <View style={styles.container(colors.background)}>
        <Text style={styles.text(colors.textPrimary)}>{route.params.categoryName} round {item.index + 1}</Text>
        <CircularProgressBar progress={progress} radius={80} strokeWidth={20} fz={40} duration={1000}/>
      </View>
    )
  }

  const [progress, setProgress] = useState(90);

  return (
    <View style={styles.container(colors.roundBackground)}>
      {/* <FlatList
        style={styles.container}
        data={GAME_ROUNDS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
      /> */}
        {/* <Text style={styles.text(colors.textPrimary)}>{route.params.categoryName} round {item.idex + 1}</Text> */}
      <RoundStatisticItem roundName='Artists 1' progress={30}/>
      {/* <CircularProgressBar progress={progress} radius={80} strokeWidth={20} fz={40} duration={2000}/>
      <CircularProgressBar progress={progress} radius={80} strokeWidth={20} fz={40} duration={1000}/>
      <CircularProgressBar progress={progress} radius={80} strokeWidth={20} fz={40} duration={3000}/>
      <CircularProgressBar progress={progress} radius={80} strokeWidth={20} fz={40} duration={4000}/>
      <CircularProgressBar progress={progress} radius={80} strokeWidth={20} fz={40} duration={4000}/>
      <CircularProgressBar progress={progress} radius={80} strokeWidth={20} fz={40} duration={4000}/>
      <CircularProgressBar progress={progress} radius={80} strokeWidth={20} fz={40} duration={4000}/>
      <CircularProgressBar progress={progress} radius={80} strokeWidth={20} fz={40} duration={4000}/> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    flex: 1,
    flexWrap: 'wrap',
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor,
    
  }),
  text: (textColor) => ({
    marginHorizontal: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: textColor
  }),
    flatListContainer: {
      flex: 1,
      margin: 16,
      gap: 20
    },
    listItem: {
      flex: 1,
      margin: 8,
    },
});