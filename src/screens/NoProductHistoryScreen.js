import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const NoProductHistory = ({ onUpload, onScan }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/phone-barcode1.png')} style={styles.image} />
      <Text style={styles.title}>No Product History</Text>
      <Text style={styles.title}>Scan or upload to</Text>
      <Text style={styles.title}>get started</Text>
      <Text style={styles.subtitle}>Scan or upload an image of your products'</Text>
      <Text style={styles.subtitle}>to identify your product</Text>
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
