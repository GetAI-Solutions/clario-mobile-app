import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';
import en from '../translation/en.json';
import fr from '../translation/fr.json';
import sw from '../translation/sw.json';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('sw');
  const [translations, setTranslations] = useState(en);

  useEffect(() => {
    AsyncStorage.getItem('language').then((lang) => {
      if (lang) {
        const normalizedLang = lang.toLowerCase();
        setLanguage(normalizedLang);
        switch (normalizedLang) {
          case 'fr':
            setTranslations(fr);
            break;
          case 'sw':
            setTranslations(sw);
            break;
          default:
            setTranslations(en);
        }
        i18n.changeLanguage(normalizedLang); // Update i18n language
      }
    });
  }, []);

  const switchLanguage = (lang) => {
    const normalizedLang = lang.toLowerCase();
    setLanguage(normalizedLang);
    switch (normalizedLang) {
      case 'fr':
        setTranslations(fr);
        break;
      case 'sw':
        setTranslations(sw);
        break;
      default:
        setTranslations(en);
    }
    i18n.changeLanguage(normalizedLang); // Update i18n language
    AsyncStorage.setItem('language', normalizedLang);
  };

  return (
    <LanguageContext.Provider value={{ language, translations, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
