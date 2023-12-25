import { configureStore, combineReducers,  } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import roundSlice from './roundSlice';
import imagesDataSlice from './imagesDataSlice';
import gameSlice from './gameSlice';

const rootReducer = combineReducers({
  game: gameSlice,
  round: roundSlice,
  imagesData: imagesDataSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});