import { createSlice } from "@reduxjs/toolkit";

const imagesDataSlice = createSlice({
  name: 'imagesData',
  initialState: [],
  reducers: {
    setImagesData(state, action) {
      return action.payload;
    },
  },
});

export default imagesDataSlice.reducer;
export const { setImagesData } = imagesDataSlice.actions;