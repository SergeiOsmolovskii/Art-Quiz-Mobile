import { configureStore, combineReducers } from '@reduxjs/toolkit';
import gameSlice from './gameSlice';
import imagesDataSlice from './imagesDataSlice';

const rootReducer = combineReducers({
  game: gameSlice,
  imagesData: imagesDataSlice
})

export const store = configureStore({
  reducer: rootReducer
})