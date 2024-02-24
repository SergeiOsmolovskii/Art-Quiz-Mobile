import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { clearAll, setVibration, setLocalization } from '../store/gameSlice';
import { useTheme } from '../theme/ThemeContext';
import { CustomSwitch } from '../components/CustomSwitch';
import { setInitialDataToAsyncStorage } from '../utils/helpers';
import { useToast } from "react-native-toast-notifications";
import DropDownPicker from 'react-native-dropdown-picker';
import { setLocalizationToAsyncStorage } from '../utils/helpers';
import imagesData_en from '../data/data_en.json';
import imagesData_ru from '../data/data_ru.json';
import imagesData_ua from '../data/data_ua.json';


export const SettingsScreen = ({ t, i18n }) => {
  const { colors, toggleTheme } = useTheme();
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.game.settings.colorScheme);
  const vibration = useSelector((state) => state.game.settings.vibration);
  const localization = useSelector((state) => state.game.settings.localization);

  const [isDarkModeOn, setIsDarkModeOn] = useState(theme === 'dark' ? true : false);
  const [isVibrationOn, setIsVibbrationOn] = useState(vibration);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [localizationValue, setLocalizationValue] = useState(localization);
  const [langs, setLangs] = useState([
    {
      label: 'En',
      value: 'en',
      icon: () => <Image source={require('../assets/icons/en.png')} style={{ width: 50, height: 30 }} />
    },
    {
      label: 'Ru',
      value: 'ru',
      icon: () => <Image source={require('../assets/icons/ru.png')} style={{ width: 50, height: 30 }} />
    },
    {
      label: 'Ua',
      value: 'ua',
      icon: () => <Image source={require('../assets/icons/ua.png')} style={{ width: 50, height: 30 }} />
    }
  ]);

  const handleSwitchDarkMode = () => {
    setIsDarkModeOn(!isDarkModeOn);
    toggleTheme();
  };

  const handleSwitchVibration = () => {
    setIsVibbrationOn(!isVibrationOn);
    dispatch(setVibration(!isVibrationOn));
  };

  const handleSetImagesData = async (localization) => {
    let newData;

    switch (localization) {
      case 'en':
        newData = imagesData_en;
        break;
      case 'ru':
        newData = imagesData_ru;
        break;
      case 'ua':
        newData = imagesData_ua;
        break;
      default:
        newData = imagesData_en;
    }

    await AsyncStorage.setItem('imagesData', JSON.stringify(newData));
  }


  const handleSwitchLocalization = async (localization) => {
    dispatch(setLocalization(localization));
    i18n.changeLanguage(localization);
    await setLocalizationToAsyncStorage(localization);
    await handleSetImagesData(localization);
    navigation.setOptions({title: t('tabs.settings')});
  };

  useEffect(() => {
    if (isAlertVisible) {
      confirmAlert();
    }
  }, [isAlertVisible]);

  const confirmAlert = () => {
    Alert.alert(
      t('settings.confirmAlert_one'),
      t('settings.confirmAlert_two'),
      [
        {
          text: t('settings.confirmAlertCancel'),
          onPress: () => {
            setIsAlertVisible(false);
          },
          style: 'cancel',
        },
        {
          text: t('settings.confirmAlertOk'),
          onPress: async () => {
            await setInitialDataToAsyncStorage(theme, localizationValue); // !!!!!!!
            dispatch(clearAll(theme));
            setIsAlertVisible(false);
            toast.show(t('settings.confirmAlert_success'), {
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
          <Text style={styles.text(colors.textPrimary)}>{t('settings.darkMode')}</Text>
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
          <Text style={styles.text(colors.textPrimary)}>{t('settings.vibration')}</Text>
          <CustomSwitch
            value={isVibrationOn}
            borderColor={colors.switchBorderColor}
            thumbColor={isDarkModeOn ? colors.switchEnable : colors.switchDisable}
            enebleColor={colors.switchEnable}
            disableColor={colors.switchDisable}
            onToggle={handleSwitchVibration}
          />
        </View>

        <View>
          <DropDownPicker
            style={styles.dropDown(colors.background, colors.dropDownBorderColor)}
            dropDownContainerStyle={styles.dropDown(colors.background, colors.dropDownBorderColor)}
            listItemLabelStyle={styles.dropDownLabel(colors.textPrimary)}
            selectedItemContainerStyle={styles.dropDownLabel(colors.textPrimary)}
            selectedItemLabelStyle={styles.dropDownLabel(colors.textPrimary)}
            labelStyle={styles.dropDownLabel(colors.textPrimary)}
            tickIconStyle={styles.tickIconStyle}
            open={dropDownOpen}
            value={localizationValue}
            items={langs}
            setOpen={setDropDownOpen}
            setValue={setLocalizationValue}
            setItems={setLangs}
            onChangeValue={handleSwitchLocalization}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.button(colors.answerButton)}
        onPress={() => setIsAlertVisible(true)}
      >
        <Text style={styles.buttonText(colors.textPrimary)}>{t('settings.clearResult')}</Text>
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
  }),
  switches: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  switchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  dropDown: (backgroundColor, borderColor) => ({
    backgroundColor: backgroundColor,
    borderWidth: 3,
    borderColor: borderColor,
  }),
  dropDownContainerStyle: (backgroundColor, borderColor) => ({
    backgroundColor: backgroundColor,
    borderWidth: 3,
    borderColor: borderColor,
  }),
  dropDownLabel: (labelColor) => ({
    color: labelColor,
    fontWeight: 'bold',
    fontSize: 20
  }),
  tickIconStyle: {
    width: 30,
    height: 30,
    tintColor: 'green'
  },
  text: (color) => ({
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: color,
  }),
  button: (backgroundColor) => ({
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '45%',
    minHeight: 60,
    marginVertical: 10,
    padding: 10,
    backgroundColor: backgroundColor,
  }),
  buttonText: (color) => ({
    textAlign: 'center',
    textTransform: 'none',
    fontWeight: 'bold',
    color: color
  })
});