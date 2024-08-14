import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageContext } from './LanguageContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { switchLanguage } = useContext(LanguageContext)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        console.log(userData)
        if (userData) {
          const parsedUser = JSON.parse(userData);
          console.log(parsedUser.preferred_language)
          setUser(parsedUser);
          if (parsedUser.preferred_language) {
            const normalizedLang = parsedUser.preferred_language.toLowerCase()
            switchLanguage(normalizedLang);
          }
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadUserData();
  }, []);
  

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
