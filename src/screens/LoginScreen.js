import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { loginUser } from '../services/authService';
import { storeUserData } from '../utils/storageUtils';
import UserContext from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/AuthHeader';
import { useTheme } from '../context/ThemeContext'; // Import useTheme

const Login = ({ navigation }) => {
  const { theme } = useTheme(); // Use theme from context
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ dial_code: '+233', name: 'Ghana' });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePhoneNumberChange = (text) => setPhoneNumber(text);
  const handleEmailChange = (text) => setEmail(text);
  const handlePasswordChange = (text) => setPassword(text);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const loginData = {
        email: isPhoneLogin ? undefined : email,
        password,
        login_type: isPhoneLogin ? undefined : 'email',
        phone_no: isPhoneLogin ? `${selectedCountry.dial_code}${phoneNumber}` : '',
      };

      const userData = await loginUser(loginData);

      if (userData) {
        await storeUserData(userData);
        setUser(userData);
        await AsyncStorage.removeItem(`products_${userData.uid}`);
        navigation.navigate('MainTabScreen');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error) => {
    let errorMessage = 'An unexpected error occurred. Please try again.';
    if (error.response) {
      switch (error.response.status) {
        case 400:
        case 401:
          setErrorMessage('Invalid email or password.');
          break;
        case 500:
          setErrorMessage('Server error. Please try again later.');
          break;
        case 404:
          setErrorMessage('User not found.');
          break;
        default:
          setErrorMessage(error.response.data.message || errorMessage);
      }
    } else if (error.request) {
      setErrorMessage('Network error. Please check your connection.');
    } else {
      setErrorMessage(error.message || errorMessage);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#000' : 'transparent', // Change background based on theme
      paddingHorizontal: 16,
      paddingVertical: 25,
    },
    head: {
      textAlign: 'left',
    },
    backButton: {
      alignSelf: 'flex-start',
      padding: 8,
    },
    title: {
      color: theme === 'dark' ? '#FFF' : '#000',
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'left',
      marginVertical: 8,
    },
    subtitle: {
      fontSize: 14,
      color: theme === 'dark' ? '#FFF' : '#000',
      textAlign: 'left',
      marginBottom: 24,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: theme === 'dark' ? '#FFF' : '#000',
      marginBottom: 8,
    },
    phoneInputContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#FFF' : '#000',
      borderRadius: 8,
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    countryPickerButton: {
      paddingRight: 10,
    },
    callingCode: {
      paddingRight: 10,
      fontSize: 14,
      color: theme === 'dark' ? '#FFF' : '#000',
    },
    phoneInput: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 12,
      fontSize: 14,
      color: theme === 'dark' ? '#FFF' : '#000',
    },
    input: {
      borderWidth: 1,
      color: theme === 'dark' ? '#FFF' : '#000',
      borderColor: theme === 'dark' ? '#FFF' : '#000',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
    },
    passwordInputContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#FFF' : '#000',
      borderRadius: 8,
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    passwordInput: {
      flex: 1,
      paddingVertical: 10,
      fontSize: 14,
      color: theme === 'dark' ? '#FFF' : '#000',
    },
    toggleButton: {
      padding: 8,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    forgotPassword: {
      padding: 8,
    },
    switchLoginMethod: {
      padding: 8,
    },
    linkText: {
      color: '#15718e',
    },
    loginButton: {
      backgroundColor: '#91C3D1', // Assuming you want to use this color for the button
      borderRadius: 100,
      alignItems: 'center',
      paddingVertical: 16,
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      marginHorizontal: 20,
    },
    buttonText: {
      color: '#FFF', // Assuming white text for the button
      fontWeight: '700',
      fontSize: 16,
    },
    disabledButton: {
      backgroundColor: '#AAABAC', // Gray color for disabled button
    },
    texture: {
      flex: 1,
      resizeMode: 'cover',
      width: '100%',
      height: '100%',
    },
    errorText: {
      color: 'red',
    },
  });

  return (
    <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}>
      <View style={styles.contentContainer}>
        <Header navigation={navigation} />
        <View style={styles.head}>
          <Text style={styles.title}>Log in to your account</Text>
          <Text style={styles.subtitle}>Enter your number or email with password</Text>
        </View>

        {isPhoneLogin ? (
          <View style={styles.inputContainer}>
            <Text style={styles.label} htmlFor="phoneNumber">Phone</Text>
            <View style={styles.phoneInputContainer}>
              <TouchableOpacity
                onPress={() => setShowCountryPicker(true)}
                style={styles.countryPickerButton}
              >
                <Text style={{color: theme === 'dark' ? '#FFF' : '#000'}}>{selectedCountry.dial_code}</Text>
              </TouchableOpacity>
              <TextInput
                id="phoneNumber"
                style={styles.phoneInput}
                placeholder="Mobile Number"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                keyboardType="phone-pad"
              />
            </View>
            {showCountryPicker && (
              <CountryPicker
                visible={showCountryPicker}
                onClose={() => setShowCountryPicker(false)}
                onSelect={setSelectedCountry}
              />
            )}
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <Text style={styles.label} htmlFor="email">Email</Text>
            <TextInput
              id="email"
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.label} htmlFor="password">Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              id="password"
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.toggleButton}
            >
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color={theme === 'dark' ? '#FFF' : '#000'} />
            </TouchableOpacity>
          </View>
        </View>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity
          style={[styles.loginButton, isLoading ? styles.disabledButton : {}]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Log In</Text>}
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.linkText}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsPhoneLogin(!isPhoneLogin)}
            style={styles.switchLoginMethod}
          >
            <Text style={styles.linkText}>{isPhoneLogin ? 'Switch to Email' : 'Switch to Phone'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;
