import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import countryList from 'react-select-country-list';
import Icon from 'react-native-vector-icons/Ionicons';

import Flag from 'react-world-flags';

const AddEmail = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ET');
  const navigation = useNavigation();
  const route = useRoute();
  const { phoneNumber, dialCode } = route.params || {};
  
  const countries = countryList().getData();

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleFullNameChange = (text) => {
    setFullName(text);
  };

  const handleContinue = () => {
    navigation.navigate('VerifyPhone', {
      email,
      fullName,
      country: countries.find(country => country.value === selectedCountry).label,
      phoneNumber,
      dialCode
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}/>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Add your email</Text>
        <Text style={styles.subtitle}>You can use your email to login to your account.</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label} htmlFor="email">Email</Text>
          <TextInput
            id="email"
            style={styles.input}
            placeholder="name@example.com"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label} htmlFor="fullName">Full Name</Text>
          <TextInput
            id="fullName"
            style={styles.input}
            placeholder="e.g. John Smith"
            value={fullName}
            onChangeText={handleFullNameChange}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label} htmlFor="country">Country</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCountry}
              onValueChange={(itemValue) => setSelectedCountry(itemValue)}
              style={styles.picker}
            >
              {countries.map((country) => (
                <Picker.Item key={country.value} label={country.label} value={country.value} />
              ))}
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleContinue}
          style={[
            styles.button,
            (!email || !fullName) && styles.disabledButton
          ]}
          disabled={!email || !fullName}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 8,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  button: {
    backgroundColor: '#14B8A6',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 20, // adjust this value to your liking
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
  },
  texture: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    zIndex: -1,
  }
});

export default AddEmail;