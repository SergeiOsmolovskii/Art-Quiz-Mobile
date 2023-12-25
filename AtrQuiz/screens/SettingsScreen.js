import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearAll, setVibration } from '../store/gameSlice';
import { useTheme } from '../theme/ThemeContext';
import { CustomSwitch } from '../components/CustomSwitch';
import { setInitialDataToAsyncStorage } from '../utils/helpers';
import { useToast } from "react-native-toast-notifications";

export const SettingsScreen = () => {
  const { colors, toggleTheme } = useTheme();
  const toast = useToast();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.game.settings.colorScheme);
  const vibration = useSelector((state) => state.game.settings.vibration);

  const [isDarkModeOn, setIsDarkModeOn] = useState(theme === 'dark' ? true : false);
  const [isVibrationOn, setIsVibbrationOn] = useState(vibration);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleSwitchDarkMode = () => {
    setIsDarkModeOn(!isDarkModeOn);
    toggleTheme();
  };

  const handleSwitchVibration = () => {
    setIsVibbrationOn(!isVibrationOn);
    dispatch(setVibration(!isVibrationOn));
  };

  useEffect(() => {
    if (isAlertVisible) {
      confirmAlert();
    }
  }, [isAlertVisible]);

  const confirmAlert = () => {
    Alert.alert(
      'Confirm deletion of data',
      'Are you sure? All your progress will be deleted!',
      [
        {
          text: 'Cancel',
          onPress: () => {
            setIsAlertVisible(false);
          },
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: async () => {
            await setInitialDataToAsyncStorage(theme);
            dispatch(clearAll(theme));
            setIsAlertVisible(false);
            toast.show('All your progress successfully deleted!', {
              type: 'success',
              placement: 'bottom',
              duration: 4000,
              offset: 30,
              animationType: 'slide-in',
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container(colors.background)}>
      <View style={styles.switches}>

        <View style={styles.switchContainer}>
          <Text style={styles.text(colors.textPrimary)}>Dark mode</Text>
          <CustomSwitch
            value={isDarkModeOn}
            borderColor={colors.switchBorderColor}
            thumbColor={isDarkModeOn ? colors.switchEnable : colors.switchDisable}
            enebleColor={colors.switchEnable}
            disableColor={colors.switchDisable}
            onToggle={handleSwitchDarkMode}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.text(colors.textPrimary)}>Vibration</Text>
          <CustomSwitch
            value={isVibrationOn}
            borderColor={colors.switchBorderColor}
            thumbColor={isDarkModeOn ? colors.switchEnable : colors.switchDisable}
            enebleColor={colors.switchEnable}
            disableColor={colors.switchDisable}
            onToggle={handleSwitchVibration}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.button(colors.answerButton)}
        onPress={() => setIsAlertVisible(true)}
      >
        <Text style={styles.buttonText(colors.textPrimary)}> Clear result </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    flex: 1,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor,
  }), switches: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }, switchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  }, text: (color) => ({
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: color,
  }), button: (backgroundColor) => ({
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '45%',
    minHeight: 60,
    marginVertical: 10,
    padding: 10,
    backgroundColor: backgroundColor,
  }), buttonText: (color) => ({
    textAlign: 'center',
    textTransform: 'none',
    fontWeight: 'bold',
    color: color
  })
});