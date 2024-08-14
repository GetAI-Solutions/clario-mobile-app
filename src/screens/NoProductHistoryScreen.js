import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';


const NoProductHistory = ({ onUpload, onScan }) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/phone-barcode1.png')} style={styles.image} />
      <Text style={styles.title}>{t('No Product History')}</Text>
      <Text style={styles.title}>{t('Scan or upload to')}</Text>
      <Text style={styles.title}>{t('get started')}</Text>
      <Text style={styles.subtitle}>{t("Scan or upload an image of your products'")}</Text>
      <Text style={styles.subtitle}>{t('to identify your product')}</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
});

export default NoProductHistory;
