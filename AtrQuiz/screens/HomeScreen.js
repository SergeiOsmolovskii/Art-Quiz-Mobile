import { StyleSheet, View, FlatList } from 'react-native';
import { Asset } from 'expo-asset';
import { useTheme } from '../theme/ThemeContext';
import { SelectRoundButton } from './../components/SelectRoundButton';

export const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();

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
    <View style={styles.container(colors.background)}>
      <FlatList
        style={styles.flatListContainer}
        data={buttonsArr}
        renderItem={({ item }) => (
          <SelectRoundButton key={item.title} title={item.title} subtitle={item.subtitle} imageURL={item.url} navigation={navigation} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    flex: 1,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor,
  }),
  flatListContainer: {
    width: '100%'
  }
});