import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const EmailInput = ({ email, onEmailChange }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>Email</Text>
    <TextInput
      style={styles.input}
      placeholder="name@example.com"
      value={email}
      onChangeText={onEmailChange}
      keyboardType="email-address"
      placeholderTextColor="#9CA3AF"
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
});

export default EmailInput;