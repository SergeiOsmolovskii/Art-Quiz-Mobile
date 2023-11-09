import { createSlice } from "@reduxjs/toolkit";
import { ARTISTS_ROUNDS, PICTURES_ROUNDS } from "../utils/variables";

const initialState = {
  artistsRounds: Array.from({ length: ARTISTS_ROUNDS }, () => null),
  picturesRounds: Array.from({ length: PICTURES_ROUNDS }, () => null),
  settings: {
    colorScheme: 'light',
    vibration: true
  },
}

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    setArtistsRounds(state, action) {
      state.artistsRounds = action.payload;
    },
    setPicturesRounds(state, action) {
      state.picturesRounds = action.payload;
    },
    setColorScheme(state, action) {
      state.settings.colorScheme = action.payload;
    },
    clearAll(state, action) {
      state.artistsRounds = initialState.artistsRounds;
      state.picturesRounds = initialState.picturesRounds;
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

export default gameSlice.reducer;
export const { setArtistsRounds, setPicturesRounds, setColorScheme, clearAll, setVibration } = gameSlice.actions;