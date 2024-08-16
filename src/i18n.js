import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translation/en.json'
import fr from './translation/fr.json'
import sw from './translation/sw.json'
import 'intl-pluralrules'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      sw: { translation: sw },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
