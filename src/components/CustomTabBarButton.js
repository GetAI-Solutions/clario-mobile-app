// src/components/CustomTabBarButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.customTabBarButton}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  customTabBarButton: {
    position: 'absolute', // Fix it to a specific position
    bottom: 0, // Ensure it's at the bottom of the screen
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensure it stretches across the width of the screen
  },
});

export default CustomTabBarButton;
