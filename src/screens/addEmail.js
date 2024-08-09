import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import countryList from 'react-select-country-list';
import Header from '../components/Header';
import axios from 'axios'; 
import  { BASEURL } from '../services/api';


const AddEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [fullName, setFullName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ET'); 
  const route = useRoute();
  const { phoneNumber, dialCode, password } = route.params || {}; 

  const countries = countryList().getData();

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  

  const handleFullNameChange = (text) => {
    setFullName(text);
  };


  const handleSignup = async () => {
    setIsLoading(true);
    try {
        const data = {
            email: email,
            user_name: fullName,
            password: password,
            phone_no: `${dialCode}${phoneNumber}`,
            country: countries.find((country) => country.value === selectedCountry).label,
        };

        console.log("Signup Data:", data);

        const signupResponse = await axios.post(`${BASEURL}/signup`, data);

        if (signupResponse.status === 200) {
            console.log("Signup Successful:", signupResponse.data);

            // Prepare data for OTP request
            const otpData = new URLSearchParams();
            otpData.append('email', email);

            // Send OTP request
            const otpResponse = await axios.post(`${BASEURL}/send-otp`, otpData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            console.log("OTP Response:", otpResponse.data);

            if (otpResponse.status === 200) {
                const { otp } = otpResponse.data;
                Alert.alert('Success', 'Signup successful and OTP sent to your email!');
                navigation.navigate('VerifyEmail', { email, otp, phoneNumber: `${dialCode}${phoneNumber}` });
            } else {
                console.log('OTP Error:', otpResponse.status, otpResponse.data);
                Alert.alert("An error occurred", "Could not send OTP. Please try again.");
            }
        } else {
            console.log("Signup Error:", signupResponse.status, signupResponse.data);
            Alert.alert('Error', 'An unexpected error occurred during signup. Please try again.');
        }
    } catch (error) {
        if (error.response) {
            console.log("Error Response:", error.response);
            const status = error.response.status;
            const message = error.response.data.message || 'An unexpected error occurred. Please try again.';

            switch (status) {
                case 400:
                    Alert.alert('Error', message || 'Bad Request. Please check your input.');
                    break;
                case 401:
                    Alert.alert('Unauthorized', 'You are not authorized to perform this action.');
                    break;
                case 403:
                    Alert.alert('Forbidden', 'You do not have permission to perform this action.');
                    break;
                case 404:
                    Alert.alert('Not Found', 'The requested resource was not found.');
                    break;
                case 422:
                    Alert.alert('Unprocessable Entity', 'The provided data was invalid.');
                    break;
                case 500:
                    Alert.alert('Server Error', 'An error occurred on the server. Please try again later.');
                    break;
                default:
                    Alert.alert('Error', message);
            }
        } else if (error.request) {
            console.log('Request Error:', error.request);
            Alert.alert('Network Error', 'No response received from the server. Please check your internet connection.');
        } else {
            console.log('Error:', error.message);
            Alert.alert('Error', error.message || 'An error occurred. Please try again.');
        }
    } finally {
        setIsLoading(false);
    }
};



  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.title}>Add your email</Text>
        <Text style={styles.subtitle}>You can use your email to login to your account.</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label} htmlFor="email">
            Email
          </Text>
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
          <Text style={styles.label} htmlFor="fullName">
            Full Name
          </Text>
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
          <Text style={styles.label} htmlFor="country">
            Country
          </Text>
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
          onPress={handleSignup}
          style={[styles.button, (!email || !fullName) && styles.disabledButton]}
          disabled={!email || !fullName}
        >
          {isLoading ? <ActivityIndicator color='#fff' /> : <Text style={styles.buttonText}>Signup</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    backgroundColor: '#3299a8',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 12,
    justifyContent: "center",
    position: 'absolute',
    bottom: 40, // adjust this value to your liking
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
});

export default AddEmail;