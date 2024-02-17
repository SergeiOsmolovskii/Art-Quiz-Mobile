import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
      en: { translation: require('./locales/en.json') },
      ru: { translation: require('./locales/ru.json') },
    },
    // debug: true,
  });

export default i18n;