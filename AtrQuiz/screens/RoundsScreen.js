import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Round } from './../components/Ronud';
import { useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';


export const RoundsScreen = () => {
  const { colors } = useTheme();

  const categoryName = useSelector((state) => state.round.categoryName);
  const roundName = `${categoryName.toLowerCase()}Rounds`;
  const rounds = useSelector((state) => state.game[roundName]);

  const preparedData = rounds?.map((currentRound, index, array) => {
    const prevRound = array[index - 1] || [];
    const prevRoundRating = prevRound.filter(subItem => subItem === true).length;
    const currentRoundRating = currentRound?.filter(subItem => subItem === true).length || 0;

    return {
      prevRoundRating: index === 0 ? 0 : prevRoundRating,
      currentRoundRating,
    };
  }) || [];

  return (
    <View style={styles.container(colors.roundBackground)}>
      <FlatList
        style={styles.flatListContainer}
        data={preparedData}
        renderItem={({ item, index }) => {
            return <Round
              roundNumber={index}
              rating={item.currentRoundRating}
              prevRoundRating={item.prevRoundRating
            }/>
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