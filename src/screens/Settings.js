import React, { useContext, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import Header from '../components/Header'; 
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import UserContext from '../context/UserContext';

const SettingsScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, setUser } = useContext(UserContext);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language); // Change language
    setUser((prevUser) => ({ ...prevUser, preferred_language: language })); // Update user context
    setLanguageModalVisible(false); // Close modal after selection
  };

  return (
    <View style={[styles.container, theme === 'light' ? lightStyles.container : darkStyles.container]}>
      <Header navigation={navigation} />
      <Text style={[styles.title, theme === 'light' ? lightStyles.title : darkStyles.title]}>{t('Settings')}</Text>
      
      <View style={styles.option}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/bell.png')} style={styles.icon} />
          <Text style={[styles.optionText, theme === 'light' ? lightStyles.optionText : darkStyles.optionText]}>{t('Notifications')}</Text>
        </View>
        <Switch />
      </View>

      <TouchableOpacity style={styles.option} onPress={() => setLanguageModalVisible(true)}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/languages.png')} style={styles.icon} />
          <Text style={[styles.optionText, theme === 'light' ? lightStyles.optionText : darkStyles.optionText]}>{t('Languages')}</Text>
        </View>
        <Image source={require('../../assets/images/dropdown.png')} style={[styles.icon, { tintColor: theme === 'dark' ? 'fff' : null }]} />
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
        />
      </View>

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/share.png')} style={styles.icon} />
          <Text style={[styles.optionText, theme === 'light' ? lightStyles.optionText : darkStyles.optionText]}>{t('Share App')}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/star.png')} style={styles.icon} />
          <Text style={[styles.optionText, theme === 'light' ? lightStyles.optionText : darkStyles.optionText]}>{t('Rate GetAI')}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/analyze.png')} style={styles.icon} />
          <Text style={[styles.optionText, theme === 'light' ? lightStyles.optionText : darkStyles.optionText]}>{t('Terms and Conditions')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
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
});

export default SettingsScreen;