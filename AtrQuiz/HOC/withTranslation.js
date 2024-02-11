import { useTranslation } from 'react-i18next';

export const withTranslation = (WrappedComponent) => {
  const WithTranslationComponent = (props) => {
    const { t, i18n } = useTranslation();
    return <WrappedComponent {...props} t={t} i18n={i18n} />;
  };

  return WithTranslationComponent;
};