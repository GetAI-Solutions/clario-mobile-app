import React, { useContext, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Image, ImageBackground, StyleSheet, Modal, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import UserContext from '../context/UserContext';
import { BASEURL } from '../services/api';
import axios from 'axios';
import PushNotification from 'react-native-push-notification';


const SettingsScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, setUser } = useContext(UserContext);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (isEnabled) {
      PushNotification.requestPermissions();
      Alert.alert(
        'Notifications',
        'Notifications have been turned on'
      );
    } else {
      Alert.alert(
        'Notifications',
        'Notifications have been turned off'
      );
    }
  };


  const handleLanguageChange = async (language) => {
    i18n.changeLanguage(language); 
    setUser((prevUser) => ({ ...prevUser, preferred_language: language }));

    try {
      const response = await axios.patch(`${BASEURL}/users/update-user-preference`, {
        user_id: user.uid,
        preferred_language: language,
      });
      
      if (response.status === 200) {
        const updatedUser = { ...user, preferred_language: language };
        setUser(updatedUser);
        Alert.alert(t('Language preference updated successfully'));
      } else {
        Alert.alert(t('Failed to update language preference'));
      }
    } catch (error) {
      Alert.alert(t('Error updating language preference'));
    }
    setLanguageModalVisible(false); 
  };

  return (
    <View style={[{flex: 1}, theme === 'light' ? lightStyles.container : darkStyles.container]}>
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture} />
    <View style={styles.container}>
      <Text style={[styles.title, theme === 'light' ? lightStyles.title : darkStyles.title]}>{t('Settings')}</Text>
      
      <View style={styles.option}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/bell.png')} style={styles.icon} />
          <Text style={[styles.optionText, theme === 'light' ? lightStyles.optionText : darkStyles.optionText]}>{t('Notifications')}</Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#daa163' }}
          thumbColor={isEnabled ? '#daa163' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <TouchableOpacity style={styles.option} onPress={() => setLanguageModalVisible(true)}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/languages.png')} style={styles.icon} />
          <Text style={[styles.optionText, theme === 'light' ? lightStyles.optionText : darkStyles.optionText]}>{t('Languages')}</Text>
        </View>
        <Image source={require('../../assets/images/dropdown.png')} style={[styles.icon, { tintColor: theme === 'dark' ? '#fff' : '#000' }]} />
      </TouchableOpacity>

      <Modal visible={languageModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleLanguageChange('en')}>
              <Text style={styles.modalText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('fr')}>
              <Text style={styles.modalText}>French</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('sw')}>
              <Text style={styles.modalText}>Swahili</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('zu')}>
              <Text style={styles.modalText}>Zulu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('ha')}>
              <Text style={styles.modalText}>Hausa</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('om')}>
              <Text style={styles.modalText}>Oromo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('am')}>
              <Text style={styles.modalText}>Amharic</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('tw')}>
              <Text style={styles.modalText}>Twi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguageModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.option}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/mode.png')} style={styles.icon} />
          <Text style={[styles.optionText, theme === 'light' ? lightStyles.optionText : darkStyles.optionText]}>{t('Dark Mode')}</Text>
        </View>
        <Switch 
          value={theme === 'dark'} 
          onValueChange={toggleTheme} 
          trackColor={{ false: '#767577', true: '#daa163' }}
          thumbColor={isEnabled ? '#daa163' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Terms')}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/analyze.png')} style={styles.icon} />
          <Text style={[styles.optionText, theme === 'light' ? lightStyles.optionText : darkStyles.optionText]}>{t('Terms and Conditions')}</Text>
        </View>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  title: {
    color: '#000',
  },
  optionText: {
    color: '#333',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
  },
  title: {
    color: '#FFF',
  },
  optionText: {
    color: '#FFF',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start', // Center content vertically
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    marginVertical: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginVertical: 10,
  },
  modalCancel: {
    fontSize: 18,
    color: 'red',
    marginTop: 10,
  },
  texture: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    zIndex: -1, // Ensure the texture is in the background
  },
});

export default SettingsScreen;
