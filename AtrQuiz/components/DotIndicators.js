import { StyleSheet, View, FlatList } from 'react-native';
import { Dot } from './Dot';

export const DotIndicators = ({ questionAnswers }) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        contentContainerStyle={styles.list}
        data={questionAnswers}
        renderItem={({ item }) => {
          let color = '';
          switch (item) {
            case true:
              color = 'green'
              break;
            case false:
              color = 'red'
              break;
            default:
              color = 'gray'
              break;
          }
          return <Dot color={color} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    width: '100%'
  },
});