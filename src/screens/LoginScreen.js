import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { loginUser } from '../services/authService';
import { storeUserData } from '../utils/storageUtils';
import UserContext from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/AuthHeader';
import { useTheme } from '../context/ThemeContext';

const Login = ({ navigation }) => {
  const { theme } = useTheme();
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



  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(''); 
    try {
      const loginData = {
        email: isPhoneLogin ? undefined : email,
        password: password,
        login_type: isPhoneLogin ? undefined : 'email',
        phone_no: isPhoneLogin ? `${selectedCountry.dial_code}${phoneNumber}` : '',
      };

      console.log(loginData)

      const userData = await loginUser(loginData);

      if (userData) {
        await storeUserData(userData);
        setUser(userData);
        await AsyncStorage.removeItem(`products_${userData.uid}`);
        navigation.navigate('MainScreen');
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
      console.log('Error response status:', error.response.status);
      
      switch (error.response.status) {
        case 400:
          return setErrorMessage('Invalid email or password.');
        case 401:
          return setErrorMessage('Invalid email or password.');
        case 500:
          return setErrorMessage('Server error. Please try again later.');
        case 404:
          return setErrorMessage('User not found.');
        default:
          return setErrorMessage(error.response.data.message || errorMessage);
      }
    } else if (error.request) {
      return setErrorMessage('Network error. Please check your connection.');
    } else {
      return setErrorMessage(error.message || errorMessage);
    }
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#fff' : '#2a2a2a',
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    head: {
      textAlign: 'left'
    },
    backButton: {
      alignSelf: 'flex-start',
      padding: 8,
    },
    title: {
      color: theme === 'light' ? '#000' : '#daa163',
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'left',
      marginVertical: 8,
    },
    subtitle: {
      fontSize: 14,
      color: theme === 'light' ? '#000' : '#fff',
      textAlign: 'left',
      marginBottom: 24,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: theme === 'light' ? '#000' : '#fff',
      marginBottom: 8,
    },
    phoneInputContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme === 'light' ? '#000' : '#fff',
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
    },
    phoneInput: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 12,
      fontSize: 14,
      color: theme === 'light' ? '#000' : '#fff',
    },
    input: {
      borderWidth: 1,
      color: theme === 'light' ? '#000' : '#fff',
      borderColor: theme === 'light' ? '#000' : '#fff',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
    },
    passwordInputContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme === 'light' ? '#000' : '#fff',
      borderRadius: 8,
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    passwordInput: {
      flex: 1,
      paddingVertical: 10,
      fontSize: 14,
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
      color: theme === 'light' ? '#15718e' : '#daa163',
    },
    loginButton: {
      backgroundColor: '#2c7391',
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
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: 16
    },
    disabledButton: {
      backgroundColor: '#A1A1AA',
    },
    texture: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    },
  });


  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}/>
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
      <Text style={{color: theme === 'light' ? '#000' : '#daa163',}}>{selectedCountry.dial_code}</Text>
            </TouchableOpacity>
            <TextInput
              id="phoneNumber"
              style={styles.phoneInput}
              placeholder="Mobile Number"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="phone-pad"
              placeholderTextColor={theme === 'light' ? '#000' : '#fff'}
            />
          </View>
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <Text style={styles.label} htmlFor="email">Email</Text>
          <TextInput
            id="email"
            style={styles.input}
            placeholder="name@example.com"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            placeholderTextColor={theme === 'light' ? '#000' : '#fff'}
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
            placeholderTextColor={theme === 'light' ? '#000' : '#fff'}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
            <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color={theme === 'light' ? '#000' : '#daa163'} />
          </TouchableOpacity>
        </View>
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword}>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsPhoneLogin(!isPhoneLogin)} style={styles.switchLoginMethod}>
          <Text style={styles.linkText}>{isPhoneLogin ? "Use email instead" : "Use phone instead"}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        style={[
          styles.loginButton,
          ((!phoneNumber || !password) && isPhoneLogin) && styles.disabledButton,
          ((!email || !password) && !isPhoneLogin) && styles.disabledButton
        ]}
        disabled={(isPhoneLogin && (!phoneNumber || !password)) || (!isPhoneLogin && (!email || !password))}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log in</Text>
        )}
      </TouchableOpacity>

      <CountryPicker
        show={showCountryPicker}
        pickerButtonOnPress={(country) => {
          setSelectedCountry({ dial_code: country.dial_code, name: country.name.en });
          setShowCountryPicker(false);
        }}
        style={{ modal: { height: '80%' } }} // Adjust the modal height
      />
    </View>
  );
};



export default Login;
