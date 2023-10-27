import { configureStore, combineReducers,  } from '@reduxjs/toolkit';
import roundSlice from './roundSlice';
import imagesDataSlice from './imagesDataSlice';
import gameSlice from './gameSlice';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  game: gameSlice,
  round: roundSlice,
  imagesData: imagesDataSlice
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
})