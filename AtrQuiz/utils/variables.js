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
  ],
  ua: [
    {
      title: 'Художники',
      subtitle: 'Вгадай художника по картині',
      url: Asset.fromModule(require('./../assets/images/artist.jpg')),
      route: 'Artists'
    },
    {
      title: 'Картини',
      subtitle: 'Вгадай картину по художнику',
      url: Asset.fromModule(require('./../assets/images/pictures.jpg')),
      route: 'Pictures'
    }
  ],
  de: [
    {
      title: "Künstler",
      subtitle: "Errate den Künstler am Bild",
      url: Asset.fromModule(require('./../assets/images/artist.jpg')),
      route: "Artists"
    },
    {
      title: "Bilder",
      subtitle: "Errate das Gemälde am Künstler",
      url: Asset.fromModule(require('./../assets/images/pictures.jpg')),
      route: "Pictures"
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
    roundDescription: `Добро пожаловать в раунд «Угадай картину»! Здесь вас ждет увлекательное задание – угадать, какая из четырех картин принадлежит определенному художнику. При каждом вопросе вам предстоит столкнуться с четырьмя загадочными картинами, но только одна из них — творение этого' художника.`
  },
  ],
  ua: [{
    title: 'Художники',
    subtitle: 'Вгадай художника по картині',
    roundName: 'Вгадай художника',
    url: Asset.fromModule(require('./../assets/images/artist.jpg')),
    roundDescription: `Ласкаво просимо до раунду «Вгадай художника»! Тут ваші знання в мистецтві будуть піддані випробуванню. Кожна картинка є загадкою, і ваше завдання вибрати правильного автора з чотирьох запропонованих варіантів відповіді.`
  },
  {
    title: 'Картини',
    subtitle: 'Вгадай картину по художнику',
    roundName: 'Вгадай картину',
    url: Asset.fromModule(require('./../assets/images/pictures.jpg')),
    roundDescription: `Ласкаво просимо до раунду «Вгадай картину»! Тут на вас чекає захоплююче завдання – вгадати, яка з чотирьох картин належить певному художнику. При кожному питанні вам доведеться зіткнутися з чотирма загадковими картинами, але тільки одна з них — витвір цього художника.`
  },
  ],
  de: [{
    title: "Künstler",
    subtitle: "Errate den Künstler am Bild",
    roundName: "Künstler Runde",
    url: Asset.fromModule(require('./../assets/images/artist.jpg')),
    roundDescription: "Willkommen bei der Errate den «Künstler»-Runde! Hier wird dein Kunstwissen auf die Probe gestellt. Jedes Bild ist ein Rätsel, und deine Aufgabe ist es, den richtigen Autor aus den vier vorgeschlagenen Antwortoptionen zu wählen."
  },
  {
    title: "Bilder",
    subtitle: "Errate das Gemälde am Künstler",
    roundName: "Bilder Runde",
    url: Asset.fromModule(require('./../assets/images/pictures.jpg')),
    roundDescription: "Willkommen bei der «Bilder»-Runde! Hier erwartet dich eine faszinierende Aufgabe - errate, welches der vier Gemälde zu einem bestimmten Künstler gehört. Bei jeder Frage siehst du vier geheimnisvolle Gemälde, aber nur eines davon ist das Werk des ausgewählten Künstlers."
}]
};