import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryName: '',
  roundNumber: null,
  questionNumber: null,
  questionAnswers: Array(10).fill(null),
  isCorrectEnd: false
};

const roundSlice = createSlice({
  name: 'round',
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
    },
    setIsCorrectEnd(state, action) {
      state.isCorrectEnd = action.payload;
    }
  },
});

export default roundSlice.reducer;
export const { setCategoryName, setRoundNumber, setQuestionNumber, setQuestionAnswers, setInitialState, setIsCorrectEnd } = roundSlice.actions;