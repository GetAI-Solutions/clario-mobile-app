import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const Footer = ({ onUpload, onScan }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const styles = StyleSheet.create({
    footer: {
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 16,
      paddingBottom: 64,
      backgroundColor: 'transparent',
      top: '80%',
      alignSelf: 'center',
    },
    button: {
      alignItems: 'center',
      marginHorizontal: 20,
    },
    iconWrapper: {
      backgroundColor: theme === 'dark' ? '#333' : '#15718e',
      borderRadius: 50,
      padding: 10,
      marginBottom: 16,
    },
    icon: {
      width: 30,
      height: 30,
      tintColor: theme === 'dark' ? '#fff' : 'white',
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme === 'dark' ? '#fff' : '#000',
    },
  });

  // Conditionally render the footer based on keyboard visibility
  if (keyboardVisible) {
    return null; // Hide footer when keyboard is visible
  }

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={onUpload} style={styles.button}>
        <View style={styles.iconWrapper}>
          <Image source={require('../../assets/images/upload.png')} style={styles.icon} />
        </View>
        <Text style={styles.label}>{t('Upload')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onScan} style={styles.button}>
        <View style={styles.iconWrapper}>
          <Image source={require('../../assets/images/scan.png')} style={styles.icon} />
        </View>
        <Text style={styles.label}>{t('Scan')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
