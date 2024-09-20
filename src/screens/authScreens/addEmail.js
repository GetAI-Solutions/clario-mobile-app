import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView, Modal, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import FullNameInput from '../../components/FullNameInput';
import CountryPickerComponent from '../../components/CountryPickerComponent';
import countryList from 'react-select-country-list';
import { signup } from '../../services/authService';
import Header from '../../components/AuthHeader';

const AddEmail = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ET');
  const [preferredLanguage, setPreferredLanguage] = useState('en');

  const route = useRoute();
  const { email, password } = route.params || {};  // Receive email and password from previous screen
  const countries = countryList().getData();

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const data = {
        email,
        user_name: fullName,
        password,
        country: countries.find((country) => country.value === selectedCountry).label,
        preferred_language: preferredLanguage,
      };

      console.log('Signup data...', data);

      const signupResponse = await signup(data);

      if (signupResponse.status === 200) {
        Alert.alert('Success', 'Signup successful!');
        navigation.navigate('Login');  // Navigate to Login screen on successful signup
      } else if (signupResponse.status === 400) {
        Alert.alert('Email already registered!');
      } else {
        Alert.alert('Error', 'An unexpected error occurred during signup. Please try again.');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      const status = error.response.status;
      let message = error.response.data.message;

      switch (status) {
        case 400:
          message = message || 'Email already used, try with another one!';
          break;
        case 401:
          message = 'You are not authorized to perform this action.';
          break;
        case 403:
          message = 'You do not have permission to perform this action.';
          break;
        case 404:
          message = 'The requested resource was not found.';
          break;
        case 422:
          message = 'The provided data was invalid.';
          break;
        case 500:
          message = 'An error occurred on the server. Please try again later.';
          break;
        default:
          message = message || 'An unexpected error occurred. Please try again.';
      }

      Alert.alert('Error', message);
    } else if (error.request) {
      Alert.alert('Network Error', 'No response received from the server. Please check your internet connection.');
    } else {
      Alert.alert('Error', error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/images/texture.png')} style={styles.texture} />
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Complete your signup</Text>
        <Text style={styles.subtitle}>Please provide your full name and country to finish your registration.</Text>

        <FullNameInput fullName={fullName} onFullNameChange={setFullName} />
        <CountryPickerComponent
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          countries={countries}
        />

        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.button, (!fullName) && styles.disabledButton]}
          disabled={!fullName}
        >
          {isLoading ? <ActivityIndicator color='#fff' /> : <Text style={styles.buttonText}>Signup</Text>}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: 'relative',
  },
  content: {
    flexGrow: 1,
    zIndex: 1,
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
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#2c7391',
    borderRadius: 28,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 100,
    marginTop: 80,
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
    resizeMode: 'cover',
    zIndex: -1,
  },
});

export default AddEmail;
