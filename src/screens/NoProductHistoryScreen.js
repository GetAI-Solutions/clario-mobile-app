import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const NoProductHistory = ({ onUpload, onScan }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <Image source={require('../../assets/images/phone-barcode1.png')} style={styles.image} />
      <Text style={[styles.title, theme === 'dark' ? styles.darkTitle : styles.lightTitle]}>{t('No Product History')}</Text>
      <Text style={[styles.title, theme === 'dark' ? styles.darkTitle : styles.lightTitle]}>{t('Scan or upload to')}</Text>
      <Text style={[styles.title, theme === 'dark' ? styles.darkTitle : styles.lightTitle]}>{t('get started')}</Text>
      <Text style={[styles.subtitle, theme === 'dark' ? styles.darkSubtitle : styles.lightSubtitle]}>{t("Scan or upload an image of your products'")}</Text>
      <Text style={[styles.subtitle, theme === 'dark' ? styles.darkSubtitle : styles.lightSubtitle]}>{t('to identify your product')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#F0F0F0',
  },
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lightTitle: {
    color: '#000',
  },
  darkTitle: {
    color: '#FFF',
  },
  subtitle: {
    fontSize: 16,
  },
  lightSubtitle: {
    color: '#333',
  },
  darkSubtitle: {
    color: '#FFF',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default NoProductHistory;
