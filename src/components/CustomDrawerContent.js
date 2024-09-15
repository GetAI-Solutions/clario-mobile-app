import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const CustomDrawerContent = (props) => {
  const { navigation } = props;
  const { user, setUser } = useContext(UserContext);
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUser(null);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Landing' }], 
      });
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  const styles = StyleSheet.create({
    drawerContainer: {
      flex: 1,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    header: {
      alignItems: 'center',
      paddingVertical: 30,
      backgroundColor: theme === 'dark' ? '#333' : '#2c7391',
      borderBottomWidth: 1,
      borderBottomColor: theme === 'dark' ? '#555' : '#ddd',
    },
    profileImage: {
      width: 90,
      height: 90,
      borderRadius: 45,
      borderWidth: 3,
      borderColor: theme === 'dark' ? '#555' : '#fff',
      backgroundColor: 'transparent',
    },
    name: {
      marginTop: 15,
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
    },
    email: {
      fontSize: 14,
      color: '#f9f9f9',
      marginBottom: 10,
    },
    menuContainer: {
      marginTop: 15,
    },
    logoutButton: {
      marginTop: 25,
      padding: 15,
      backgroundColor: '#f44',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20,
      borderRadius: 10,
    },
    logoutText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  return (
    <ImageBackground
      source={require('../../assets/images/texture.png')} // Add your texture image here
      style={styles.backgroundImage}
    >
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
        <View style={styles.header}>
          <Image
            source={{ uri: user?.profileImage || 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{user?.user_name || t('Guest')}</Text>
          <Text style={styles.email}>{user?.email || t('guest@example.com')}</Text>
        </View>
        <View style={styles.menuContainer}>
          <DrawerItem
            label={t('Share GetAI')}
            labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
            icon={({ focused, size }) => (
              <Icon
                name={'share-outline'}
                size={size}
                color={theme === 'dark' ? '#fff' : '#000'}
              />
            )}
          />
          <DrawerItem
            label={t('FAQ')}
            labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
            icon={({ focused, size }) => (
              <Icon
                name={'help'}
                size={size}
                color={theme === 'dark' ? '#fff' : '#000'}
              />
            )}
            onPress={() => navigation.navigate('FAQ')}
          />
          <DrawerItem
            label={t('Feedback')}
            labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
            icon={({ focused, size }) => (
              <Icon
                name={focused ? 'chatbox' : 'chatbox-outline'}
                size={size}
                color={theme === 'dark' ? '#fff' : '#000'}
              />
            )}
            onPress={() => navigation.navigate('Feedback')}
          />
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>{t('Logout')}</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </ImageBackground>
  );
};

export default CustomDrawerContent;
