import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Asset } from 'expo-asset';
import { SelectRoundButton } from './../components/SelectRoundButton';

export const HomeScreen = ({ navigation }) => {

  const buttonsArr = [{
      title: 'Artists',
      subtitle: 'Guess the artist by the picture',
      url: Asset.fromModule(require('./../assets/images/artist.jpg'))
    },
    {
      title: 'Pictures',
      subtitle: 'Guess the painting by the artist',
      url: Asset.fromModule(require('./../assets/images/pictures.jpg'))
    }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatListContainer}
        data={buttonsArr}
        renderItem={({ item }) => (
          <SelectRoundButton title={item.title} subtitle={item.subtitle} imageURL={item.url} navigation={navigation} />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {
    width: '100%'
  }
});