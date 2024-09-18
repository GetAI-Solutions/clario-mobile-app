import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { loginUser } from '../services/authService';
import { storeUserData } from '../utils/storageUtils';
import UserContext from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/AuthHeader';
import Icon from 'react-native-vector-icons/Ionicons';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (text) => setEmail(text);
  const handlePasswordChange = (text) => setPassword(text);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const loginData = {
        email,
        password,
        login_type: 'email',
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
      backgroundColor: 'transparent',
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
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'left',
      marginVertical: 8,
    },
    subtitle: {
      fontSize: 14,
      textAlign: 'left',
      marginBottom: 24,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
    },
    passwordInputContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#000',
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
    linkText: {
      color: '#15718e',
    },
    loginButton: {
      backgroundColor: '#91C3D1',
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
      color: '#FFF',
      fontWeight: '700',
      fontSize: 16,
    },
    disabledButton: {
      backgroundColor: '#AAABAC',
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
          <Text style={styles.subtitle}>Enter your email with password</Text>
        </View>

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
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#000" />
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
          <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.linkText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;
