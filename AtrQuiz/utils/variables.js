import { Asset } from 'expo-asset';

export const ARTISTS_ROUNDS = 12;
export const PICTURES_ROUNDS = 12;
export const GAME_ROUNDS = 12;
export const TOTAL_QUESTIONS_IN_ROUND = 10;
export const TOTAL_QUESTION_BUTTONS = 4;
export const BASIC_IMAGE_URL = 'https://raw.githubusercontent.com/SergeiOsmolovskii/image-data/master/img/';
export const QUESTION_ANIMATION_TIMING = 1000;
export const CORRECT_ANSWER_VIBRATION_PATTERN = [300, 300];
export const INCORRECT_ANSWER_VIBRATION_PATTERN = [300, 200, 300, 200];
export const CIRCLE_STARS_RADIUS = 100;
export const QUESTIONS_GROUPS = {
  Artist: '0',
  Pictures: '1'
};

export const BUTTONS_ARR = {
  en: [
    {
      title: 'Artists',
      subtitle: 'Guess the artist by the picture',
      url: Asset.fromModule(require('./../assets/images/artist.jpg')),
      route: 'Artists'
    },
    {
      title: 'Pictures',
      subtitle: 'Guess the painting by the artist',
      url: Asset.fromModule(require('./../assets/images/pictures.jpg')),
      route: 'Pictures'
    }
  ],
  ru: [
    {
      title: 'Художники',
      subtitle: 'Угадай художника по картине',
      url: Asset.fromModule(require('./../assets/images/artist.jpg')),
      route: 'Artists'
    },
    {
      title: 'Картины',
      subtitle: 'Угадай картину по художнику',
      url: Asset.fromModule(require('./../assets/images/pictures.jpg')),
      route: 'Pictures'
    }
  ]
};

export const GAMES_DATA = {
  en: [{
    title: 'Artists',
    subtitle: 'Guess the artist by the picture',
    roundName: 'Artists round',
    url: Asset.fromModule(require('./../assets/images/artist.jpg')),
    roundDescription: `Welcome to the Guess the «Artist" round»! Here your knowledge of art will be put to the test. Each picture is a riddle, and your task is to choose the correct author from the four proposed answer options.`
  },
  {
    title: 'Pictures',
    subtitle: 'Guess the painting by the artist',
    roundName: 'Pictures round',
    url: Asset.fromModule(require('./../assets/images/pictures.jpg')),
    roundDescription: `Welcome to the «Pictures" round»! Here you will find a fascinating task - to guess which of the four paintings belongs to a certain artist. With each question, you are faced with four mysterious paintings, but only one of them is the creation of the chosen artist.`
  },
  ],
  ru: [{
    title: 'Художники',
    subtitle: 'Угадай художника по картине',
    roundName: 'Угадай художника',
    url: Asset.fromModule(require('./../assets/images/artist.jpg')),
    roundDescription: `Добро пожаловать в раунд «Угадай художника»! Здесь ваши познания в искусстве будут подвергнуты испытанию. Каждая картинка представляет собой загадку, и ваша задача выбрать правильного автора из четырех предложенных вариантов ответа.`
  },
  {
    title: 'Картины',
    subtitle: 'Угадай картину по художнику',
    roundName: 'Угадай картину',
    url: Asset.fromModule(require('./../assets/images/pictures.jpg')),
    roundDescription: `Добро пожаловать в раунд «Угадай картину»! Здесь вас ждет увлекательное задание – угадать, какая из четырех картин принадлежит определенному художнику. При каждом вопросе вам предстоит столкнуться с четырьмя загадочными картинами, но только одна из них — творение выбранного художника.`
  },
  ],
};