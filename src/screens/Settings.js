import React from 'react';
import { View, Text, Switch, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Header from '../components/Header'; 
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

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

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/lock.png')} style={styles.icon} />
          <Text style={[styles.optionText, theme === 'light' ? lightStyles.optionText : darkStyles.optionText]}>{t('Account & Security')}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/languages.png')} style={styles.icon} />
          <Text style={[styles.optionText, theme === 'light' ? lightStyles.optionText : darkStyles.optionText]}>{t('Languages')}</Text>
        </View>
        <Image source={require('../../assets/images/dropdown.png')} style={styles.icon} />
      </TouchableOpacity>

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
});

export default SettingsScreen;
