import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryName: '',
  roundNumber: null,
  questionNumber: null,
  questionAnswers: Array(10).fill(null)
}

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    setCategoryName(state, action) {
      state.categoryName = action.payload;
    },
    setRoundNumber(state, action) {
      state.roundNumber = action.payload;
    },
    setQuestionNumber(state) {
      state.questionNumber += 1;
    },
    setQuestionAnswers(state, action) {
      state.questionAnswers[state.questionNumber - 1] = action.payload;
    },
    setInitialState(state) {
      Object.assign(state, { ...initialState });
    }
  },
});

export default gameSlice.reducer;
export const { setCategoryName, setRoundNumber, setQuestionNumber, setQuestionAnswers, setInitialState } = gameSlice.actions;