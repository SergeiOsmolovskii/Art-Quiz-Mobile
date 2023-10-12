import { createSlice } from "@reduxjs/toolkit";
import { ARTISTS_ROUNDS, PICTURES_ROUNDS } from "../utils/variables";

const initialState = {
  artistsRounds: Array.from({ length: ARTISTS_ROUNDS }, () => null),
  picturesRounds: Array.from({ length: PICTURES_ROUNDS }, () => null),
  settings: {},
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
  },
});

export default gameSlice.reducer;
export const { setArtistsRounds, setPicturesRounds } = gameSlice.actions;