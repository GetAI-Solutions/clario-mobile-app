import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const CustomActivityIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#15718e" />
      <Text style={styles.text}>Searching...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginTop: 1,
  },
});

export default CustomActivityIndicator;

