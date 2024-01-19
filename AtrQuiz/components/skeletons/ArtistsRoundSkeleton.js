import { View, StyleSheet } from 'react-native';
import { TOTAL_QUESTION_BUTTONS } from '../../utils/variables';
import { Skeleton } from "./Skeleton";

export const ArtistsRoundSkeleton = () => {

  return (
    <View style={styles.container}>
      <Skeleton width={70} height={24} marginBottom={25} marginTop={0} style={styles.textSkeleton} />
      <Skeleton width={'90%'} height={24} marginBottom={12} />
      <View style={styles.image}>
        <Skeleton width={'100%'} height={'100%'} marginBottom={0} />
      </View>
      <Skeleton width={'100%'} height={24} marginBottom={12} />
      <View style={styles.buttonsContainer}>
        {Array.from({ length: TOTAL_QUESTION_BUTTONS }, (_, index) => (
          <View key={index} style={styles.button}>
            <Skeleton width={'100%'} height={60} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    zIndex: 1000
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '50%',
    paddingHorizontal: 5,
    marginBottom: 25
  },
  button: {
    width: '45%',
    minHeight: 60,
    marginVertical: 10,
  },
});