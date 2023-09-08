import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SelectRoundButton } from './../components/SelectRoundButton'
import { Asset } from 'expo-asset';

export const HomeScreen = () => {

  const buttonsArr = [{
      name: 'Artist',
      url: Asset.fromModule(require('./../assets/images/artist.jpg'))
    },
    {
      name: 'Pictures',
      url: Asset.fromModule(require('./../assets/images/pictures.jpg'))
    }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatListContainer}
        data={buttonsArr}
        renderItem={({ item }) => (
          <SelectRoundButton imageName={item.name} imageURL={item.url} />
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