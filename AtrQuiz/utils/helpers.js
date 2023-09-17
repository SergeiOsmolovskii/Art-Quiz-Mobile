import { TOTAL_QUESTION_BUTTONS } from "./variables";

export const getAllUniqueAuthors = (imagesData) => {
  return [...new Set(imagesData.map(item => item.author))];
}

export const getAllUniqueAuthorsWithoutCorrect = (imagesData, correctAnswer) => {

  const set = new Set(imagesData.map(item => item.author))
  set.delete(correctAnswer);
  return [...set];
}

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
}

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}