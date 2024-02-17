import { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Round } from './../components/Ronud';
import { useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';
import { useRoute } from '@react-navigation/native';

export const RoundsScreen = ({ t, navigation }) => {
  const { colors } = useTheme();
  const route = useRoute();
  const categoryName = useSelector((state) => state.round.categoryName);
  const roundsData = useSelector((state) => state.game.roundsData);
  const rounds = roundsData[categoryName]?.data || [];


  const preparedData = rounds?.map((currentRound, index, array) => {
    const prevRound = array[index - 1] || [];
    const prevRoundRating = prevRound.answers?.filter(subItem => subItem === true).length || 0;
    const currentRoundRating = currentRound.answers?.filter(subItem => subItem === true).length || 0;

    return {
      prevRoundRating: index === 0 ? 0 : prevRoundRating,
      currentRoundRating,
    };
  }) || [];

  useEffect(() => {
    if (route.params && route.params.title) {
      navigation.setOptions({ title: route.params.title });
    }
  }, [route.params]);

  return (
    <View style={styles.container(colors.roundBackground)}>
      <FlatList
        style={styles.flatListContainer}
        data={preparedData}
        renderItem={({ item, index }) => {
          return <Round t={t} roundName={route.params.title} roundNumber={index} rating={item.currentRoundRating} prevRoundRating={item.prevRoundRating} />
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: backgroundColor
  }),
});