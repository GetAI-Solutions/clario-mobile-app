import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView, Modal, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import EmailInput from '../components/EmailInput';
import FullNameInput from '../components/FullNameInput';
import CountryPickerComponent from '../components/CountryPickerComponent';
import countryList from 'react-select-country-list';
import { signup, sendOtp } from '../services/authService';
import Header from '../components/AuthHeader';

const AddEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ET');
  const [preferredLanguage, setPreferredLanguage] = useState('en');

  const route = useRoute();
  const { phoneNumber, dialCode, password } = route.params || {};
  const countries = countryList().getData();

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const data = {
        email,
        user_name: fullName,
        password,
        phone_no: `${dialCode}${phoneNumber}`,
        country: countries.find((country) => country.value === selectedCountry).label,
        preferred_language: preferredLanguage,
      };

      console.log('Signup data...', data)

      const signupResponse = await signup(data);

      if (signupResponse.status === 200) {
        const otpResponse = await sendOtp(email);

        if (otpResponse.status === 200) {
          const { otp } = otpResponse.data;
          console.log(otp)
          Alert.alert('Success', 'Signup successful and OTP sent to your email!');
          navigation.navigate('VerifyEmail', { email, otp, phoneNumber: `${dialCode}${phoneNumber}`, preferredLanguage });
        } else {
          Alert.alert("An error occurred", "Could not send OTP. Please try again.");
        }
      } else if(signupResponse.status === 400) {
        Alert.alert('Email already registered!')
      }
      else {
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
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}/>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Add your email</Text>
        <Text style={styles.subtitle}>You can use your email to login to your account.</Text>

        <EmailInput email={email} onEmailChange={setEmail} />
        <FullNameInput fullName={fullName} onFullNameChange={setFullName} />
        <CountryPickerComponent
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          countries={countries}
        />

        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.button, (!email || !fullName) && styles.disabledButton]}
          disabled={!email || !fullName}
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
    position: 'relative', // Ensure the container has relative positioning
  },
  content: {
    flexGrow: 1, // Allow the content to grow and fill the space
    zIndex: 1, // Ensure content is above the background image
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
    fontWeight: "500",
  },
  button: {
    backgroundColor: '#2c7391',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
  },
  languageButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  languageButtonText: {
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  languageLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: "500",
  },
  languagePicker: {
    width: '100%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2c7391',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
  },
  texture: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    zIndex: -1, // Ensure the background image is behind everything else
  }
});

export default AddEmail;
