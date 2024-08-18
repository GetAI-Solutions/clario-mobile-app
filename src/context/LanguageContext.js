import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('sw');

  useEffect(() => {
    AsyncStorage.getItem('language').then((lang) => {
      if (lang) {
        setLanguage(lang);
        i18n.changeLanguage(lang); // Update i18n language
      }
    });
  });

  const switchLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang); // Update i18n language
    AsyncStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};