import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translation/en.json'
import fr from './translation/fr.json'
import sw from './translation/sw.json'
import om from './translation/om.json'
import ha from './translation/ha.json'
import am from './translation/am.json'
import zu from './translation/zu.json'
import tw from './translation/tw.json'
import 'intl-pluralrules'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      sw: { translation: sw },
      om: { translation: om }, 
      ha: { translation: ha }, 
      zu: { translation: zu }, 
      am: { translation: am }, 
      tw: { translation: tw }

    },
    lng: 'en', 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
