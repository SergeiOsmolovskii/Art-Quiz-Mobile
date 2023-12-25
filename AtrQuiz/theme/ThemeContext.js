import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { lightThemeStyles } from './lightTheme';
import { darkThemeStyles } from './darkTheme';
import { setTheme } from '../store/gameSlice';
import { StatusBar } from 'expo-status-bar';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.game.settings.colorScheme);
  const [colorScheme, setColorScheme] = useState(theme);

  const colors = useMemo(() => {
    return colorScheme === 'dark' ? darkThemeStyles : lightThemeStyles;
  }, [colorScheme]);

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  const toggleTheme = async () => {
    const newColorScheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newColorScheme);
    const existingData = await AsyncStorage.getItem('storage');
    const parsedData = JSON.parse(existingData);
    parsedData.settings.colorScheme = newColorScheme;

    try {
      await AsyncStorage.setItem('storage', JSON.stringify(parsedData));
      dispatch(setTheme(newColorScheme));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleTheme, colors }}>
      <StatusBar
        translucent
        backgroundColor='transparent'
        style={colorScheme === 'dark' ? 'light' : 'dark'}
      />
      {children}
    </ThemeContext.Provider>
  );
};
