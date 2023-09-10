import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Round } from './../components/Ronud';


export const RoundsScreen = ({ navigation, route }) => {

  const [roundData, setRoundData] = useState({});

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
        data={roundData.artistsRonuds}
        renderItem={({ item, index }) => (
          
          <Round category={route.name} roundNumber={index} rating={'1'}/>
        )}
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