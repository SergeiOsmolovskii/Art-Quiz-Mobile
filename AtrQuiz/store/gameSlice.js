import { createSlice } from "@reduxjs/toolkit";
import { initialRoundsData } from "../utils/helpers";

const initialState = {
  roundsData: initialRoundsData(),
  settings: {
    colorScheme: 'light',
    vibration: true
  },
}

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    setRounds(state, action) {
      const { roundType, data } = action.payload;
      state.roundsData[roundType] = data;
    },
    setAttempts(state, action) {
      const { roundType, roundNumber } = action.payload;
      state.roundsData[roundType].data[roundNumber].attempts += 1;
      console.log(state.roundsData[roundType].data[roundNumber].attempts)
    },
    setColorScheme(state, action) {
      state.settings.colorScheme = action.payload;
    },
    clearAll(state, action) {
      state.roundsData = initialRoundsData();
      state.settings.colorScheme = action.payload;
    },
    setVibration(state, action) {
      state.settings.vibration = action.payload;
    }
  },
});

export const setTheme = (colorScheme) => {
  return (dispatch) => {
    dispatch(gameSlice.actions.setColorScheme(colorScheme));
  };
}

export const setRoundsData = (roundType, data) => {
  return (dispatch) => {
    dispatch(gameSlice.actions.setRounds({ roundType, data }));
  };
}

export default gameSlice.reducer;
export const { setAttempts, setColorScheme, clearAll, setVibration } = gameSlice.actions;