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
    top: -20, // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTabBarButton;
