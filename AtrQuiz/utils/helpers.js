import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOTAL_QUESTION_BUTTONS, GAME_ROUNDS, GAMES_DATA } from "./variables";

export const getAllUniqueAuthors = (imagesData) => {
  return [...new Set(imagesData.map(item => item.author))];
};

export const getAllUniqueAuthorsWithoutCorrect = (imagesData, correctAnswer) => {
  const set = new Set(imagesData.map(item => item.author));
  set.delete(correctAnswer);
  return [...set];
};

export const getAllUniqueImagesWithoutCorrect = (imagesData, correctAnswer) => {
  const set = new Set(imagesData.filter(item => item.author != correctAnswer.author));
  return [...set];
};

export const currentShuffleQuestionAnswers = (imagesData, correctAnswer) => {
  const unicAnswers = getAllUniqueAuthorsWithoutCorrect(imagesData, correctAnswer);
  const answers = [correctAnswer];

  for (let i = 1; i < TOTAL_QUESTION_BUTTONS; i++) {
    const randomIndex = Math.floor(Math.random() * unicAnswers.length);
    answers.push(unicAnswers[randomIndex]);
    unicAnswers.splice(randomIndex, 1)
  }
  shuffle(answers);
  return answers;
};

export const currentShuffleQuestionImagesAnswers = (imagesData, correctAnswer) => {
  const unicAnswers = getAllUniqueImagesWithoutCorrect(imagesData, correctAnswer);
  const answers = [correctAnswer];

  for (let i = 1; i < TOTAL_QUESTION_BUTTONS; i++) {
    const randomIndex = Math.floor(Math.random() * unicAnswers.length);
    answers.push(unicAnswers[randomIndex]);
    unicAnswers.splice(randomIndex, 1)
  }

  shuffle(answers);
  return answers;
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

export const checkIsCorrectAnswer = (currentAnswer, correctAnswer) => {
  return currentAnswer === correctAnswer ? true : false;
};

export const initialRoundsData =  () => {
  const round = {
    data: Array.from({ length: GAME_ROUNDS }, () => ({
      answers: null,
      attempts: 0,
      attemptsToBestResult: null,
      bestTime: 'not supported yet'
    })),
  };

  const roundsData = {};
  GAMES_DATA.forEach(game => roundsData[game.title] = { ...round, ...game });
  return roundsData;
};

export const setInitialDataToAsyncStorage = async (colorScheme) => {
  const data = {
    roundsData: initialRoundsData(),
    settings: {
      colorScheme: colorScheme,
      vibration: true
    },
  };
  await AsyncStorage.setItem('storage', JSON.stringify(data));
  return data;
};

export const rgbaToHex = (rgbaString) => {
  const values = rgbaString.match(/\d+/g);

  if (!values || values.length < 3) {
    return null;
  }

  const [r, g, b] = values.map(val => parseInt(val).toString(16).padStart(2, '0'));
  return `#${r}${g}${b}`;
};