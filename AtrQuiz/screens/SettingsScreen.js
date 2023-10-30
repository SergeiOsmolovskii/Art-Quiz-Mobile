import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';
import { CustomSwitch } from '../components/CustomSwitch';

export const SettingsScreen = () => {
  const { colors, toggleTheme } = useTheme();
  const theme = useSelector((state) => state.game.settings.colorScheme);
  const [isDarkModeOn, setIsDarkModeOn] = useState(theme === 'dark' ? true : false);

  const handleSwitchDarkMode = () => {
    setIsDarkModeOn(!isDarkModeOn);
    toggleTheme();
  };

  return (
    <View style={styles.container(colors.background)}>
      <Text>Settings screen</Text>

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

    </View>
  );
}

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    flex: 1,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    backgroundColor,
  }), switchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  }, text: (color) => ({
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: color,
  })
});