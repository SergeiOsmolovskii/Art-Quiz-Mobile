import { TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { BASIC_IMAGE_URL } from '../utils/variables';

export const AnswerImageButton = ({ item, handlePressImageButton, onImageLoad }) => {

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handlePressImageButton(item)}
    >
      <ImageBackground
        source={{ uri: `${BASIC_IMAGE_URL}${item.imageNum}.jpg` }}
        style={styles.image}
        onLoad={onImageLoad}
      >
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '50%',
    aspectRatio: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});