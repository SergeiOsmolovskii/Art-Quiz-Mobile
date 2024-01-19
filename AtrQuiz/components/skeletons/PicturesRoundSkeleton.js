import { View, StyleSheet } from 'react-native';
import { TOTAL_QUESTION_BUTTONS } from '../../utils/variables';
import { Skeleton } from "./Skeleton";

export const PicturesRoundSkeleton = () => {

  return (
    <View style={styles.container}>
      <Skeleton width={70} height={24} marginBottom={30} marginTop={10} style={styles.textSkeleton} />
      <Skeleton width={'90%'} height={50} marginBottom={30} />

      <Skeleton width={'95%'} height={24} marginBottom={25} />

      <View style={styles.imagesContainer}>
        {Array.from({ length: TOTAL_QUESTION_BUTTONS }, (_, index) => (
          <View key={index} style={styles.button}>
            <Skeleton width={'100%'} height={'100%'} />
          </View>
        ))}
      </View>


    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: '50%',
    aspectRatio: 1,
    padding: 10,
  },
});