import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView, Alert, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import EmailInput from '../components/EmailInput';
import Header from '../components/AuthHeader';
import { sendOtp } from '../services/authService';

const AddEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    console.log('handle send otp triggered...')
    setIsLoading(true);
    try {
      const otpResponse = await sendOtp(email);
      if (otpResponse.status === 200) {
        const { otp } = otpResponse.data;
        navigation.navigate('OTPPage', { otp, email });
      } else {
        throw Error('Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}/>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps='handled'>
        
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>Enter your email address. We'll send an OTP to reset your password</Text>

        <EmailInput email={email} onEmailChange={setEmail} />
        
        <Image source={require('../../assets/images/Password.png')} style={styles.image}/>

        <TouchableOpacity
          onPress={handleSendOtp}
          style={[styles.button, (!email) && styles.disabledButton]}
          disabled={!email || isLoading}
        >
          {isLoading ? <ActivityIndicator color='#fff' /> : <Text style={styles.buttonText}>Send OTP</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  content: {
    marginTop: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 8,
    textAlign: 'center'
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#2c7391',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 16,
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
  texture: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    zIndex: -1,
  }
});

export default AddEmail;