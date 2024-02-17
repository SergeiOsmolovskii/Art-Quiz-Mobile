import { StyleSheet, View, FlatList } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { SelectRoundButton } from './../components/SelectRoundButton';
import { useSelector } from 'react-redux';
import { BUTTONS_ARR } from '../utils/variables';


export const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const localization = useSelector((state) => state.game.settings.localization);

  return (
    <View style={styles.container(colors.background)}>
      <FlatList
        style={styles.flatListContainer}
        data={BUTTONS_ARR[localization]}
        renderItem={({ item }) => (
          <SelectRoundButton
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            imageURL={item.url}
            route={item.route}
            navigation={navigation}
          />
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