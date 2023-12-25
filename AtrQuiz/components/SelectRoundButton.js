import { StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { setCategoryName } from '../store/roundSlice';
import { useTheme } from '../theme/ThemeContext';

export const SelectRoundButton = ({ title, subtitle, imageURL, navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setCategoryName(title));
    navigation.navigate(title);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => handleNavigate()}>
      <ImageBackground
        source={imageURL}
        style={styles.image}
        resizeMode='cover'
      >
        <Text style={styles.title(colors.mainButtonTextPrimary)}>{title}</Text>
        <Text style={styles.subtitle(colors.mainButtonTextSecondary)}>{subtitle}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
  }, image: {
    height: 125,
  }, title: (color) => ({
    marginHorizontal: 10,
    marginVertical: 5,
    fontSize: 30,
    fontWeight: 'bold',
    color: color
  }), subtitle: (color) => ({
    maxWidth: '40%',
    marginHorizontal: 10,
    fontSize: 16,
    color: color
  })
});