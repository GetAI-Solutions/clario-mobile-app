import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageContext } from './LanguageContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { switchLanguage } = useContext(LanguageContext);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        if (parsedUser.preferred_language) {
          switchLanguage(parsedUser.preferred_language.toLowerCase());
        }
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [switchLanguage]);

  const updateUser = async (updatedUser) => {
    try {
      if (updatedUser) {
        // If there's user data, store it in AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
      } else {
        // If no user data is provided (null/undefined), remove user data from AsyncStorage (logout scenario)
        await AsyncStorage.removeItem('userData');
      }
      setUser(updatedUser); // Update the state accordingly
    } catch (error) {
      console.error('Failed to update user data', error);
    }
  };
  

  if (loading) {
    return <></>; // Render nothing while loading
  }

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};


export default UserContext;