import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Round } from './../components/Ronud';
import { useSelector } from 'react-redux';


export const RoundsScreen = ({ navigation }) => {
  const categoryName = useSelector((state) => state.game.categoryName);

  const [roundData, setRoundData] = useState({});
  const roundName = `${categoryName.toLowerCase()}Rounds`;
  const preparedData = roundData[roundName]?.map((currentRound, index, array) => {
    const prevRound = array[index - 1] || [];
    const prevRoundRating = prevRound.filter(subItem => subItem === true).length;
    const currentRoundRating = currentRound?.filter(subItem => subItem === true).length || 0;

    return {
      prevRoundRating: index === 0 ? 0 : prevRoundRating,
      currentRoundRating,
    };
  }) || [];

  useEffect(() => {
    (async () => {
      try {
        const storage = await AsyncStorage.getItem('storage');
        setRoundData(JSON.parse(storage));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Rounds screen</Text>

      <FlatList
        style={styles.flatListContainer}
        data={preparedData}
        renderItem={({ item, index }) => {
            return <Round roundNumber={index} rating={item.currentRoundRating} prevRoundRating={item.prevRoundRating} navigation={navigation}/>
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: 'green'
  },
});