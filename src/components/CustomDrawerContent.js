import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  const styles = StyleSheet.create({
    drawerContainer: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
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
          label={t('Home')}
          labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
          icon={({ focused, size }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={theme === 'dark' ? '#fff' : '#000'}
            />
          )}
          onPress={() => navigation.navigate('MainScreen')}
        />
        <DrawerItem
          label={t('Profile')}
          labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
          icon={({ focused, size }) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={theme === 'dark' ? '#fff' : '#000'}
            />
          )}
          onPress={() => navigation.navigate('Profile')}
        />
        <DrawerItem
          label={t('Settings')}
          labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
          icon={({ focused, size }) => (
            <Icon
              name={focused ? 'settings' : 'settings-outline'}
              size={size}
              color={theme === 'dark' ? '#fff' : '#000'}
            />
          )}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>{t('Logout')}</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;