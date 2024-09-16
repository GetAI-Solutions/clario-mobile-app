import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CountryPickerComponent = ({ selectedCountry, onCountryChange, countries }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>Country</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedCountry}
        onValueChange={onCountryChange}
        style={styles.picker}
      >
        {countries.map((country) => (
          <Picker.Item key={country.value} label={country.label} value={country.value} />
        ))}
      </Picker>
    </View>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
  },
  picker: {
    height: 40,
    width: '100%',
  },
});

export default CountryPickerComponent;