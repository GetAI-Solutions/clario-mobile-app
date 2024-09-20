import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';

const NoProductHistory = ({ onUpload, onScan }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, theme === 'dark' ? {backgroundColor: '#1e1e1e'} : {backgroundColor: '#FFF'}]}>
      <ImageBackground source={require('../../../assets/images/texture.png')} style={styles.texture}/>
      <Image source={require('../../../assets/images/phone-barcode1.png')} style={styles.image} />
      <Text style={[styles.title, theme === 'dark' ? styles.darkTitle : styles.lightTitle]}>{t('No Product History')}</Text>
      <Text style={[styles.title, theme === 'dark' ? styles.darkTitle : styles.lightTitle]}>{t('Scan or upload to')}</Text>
      <Text style={[styles.title, theme === 'dark' ? styles.darkTitle : styles.lightTitle]}>{t('get started')}</Text>
      <Text style={[styles.subtitle, theme === 'dark' ? styles.darkSubtitle : styles.lightSubtitle, {marginTop: 15}]}>{t("Scan or upload an image of your products'")}</Text>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    margin: 0,
    lineHeight: 35,
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
  texture: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  }
});

export default NoProductHistory;
