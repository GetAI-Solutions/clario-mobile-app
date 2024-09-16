import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserData = async (userData) => {
  await AsyncStorage.setItem('userData', JSON.stringify(userData));
};