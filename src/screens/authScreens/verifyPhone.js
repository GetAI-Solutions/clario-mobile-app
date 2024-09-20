import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../../components/Header';
import { sendOtp } from '../../services/authService'; 

const VerifyPhone = ({ navigation }) => {
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '', '', '']);
  const [currentOtp, setCurrentOtp] = useState(null); 
  const [isResendDisabled, setIsResendDisabled] = useState(true); 
  const [countdown, setCountdown] = useState(30); 
  const otpInputs = useRef([]);
  const [resendLoading, setResendLoading] = useState(false);

  const route = useRoute();
  const { email, otp, password } = route.params || {};

  useEffect(() => {
    setCurrentOtp(otp); 
    startCountdown(); 
  }, [otp]);

  const handleChange = (text, index) => {
    const newOtp = [...enteredOtp];
    newOtp[index] = text;
    setEnteredOtp(newOtp);

    if (text && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  // Handle OTP submission
  const handleSubmit = () => {
    const enteredOtpStr = enteredOtp.join('').trim();
    const serverOtpStr = String(currentOtp).trim(); 

    console.log('Entered OTP:', enteredOtpStr);
    console.log('Server OTP:', serverOtpStr);

    if (enteredOtpStr === serverOtpStr) {
      Alert.alert('Success', 'OTP verified successfully!');
      console.log('Navigating to Email Signup');
      navigation.navigate('EmailSignup', { email, password });
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    try {
      const otpResponse = await sendOtp(email); 
      const { otp } = otpResponse.data;
      const newOTP = otp
      console.log('new otp', newOTP)
      setCurrentOtp(newOTP); 
      setEnteredOtp(['', '', '', '', '', '']); 
      startCountdown(); 
      Alert.alert('Success', 'A new OTP has been sent to your email.');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP. Please try again later.');
    } finally {
      setResendLoading(false);
    }
  };

  const startCountdown = () => {
    setIsResendDisabled(true); 
    setCountdown(30); 
    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(intervalId); 
          setIsResendDisabled(false); 
        }
        return prev - 1;
      });
    }, 1000); 
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/texture.png')}
        style={styles.texture}
        resizeMode="cover"
      />
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.title}>Confirm Your Email</Text>
        <Text style={styles.subtitle}>We've sent a code to {email}</Text>

        <View style={styles.otpContainer}>
          {enteredOtp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(input) => (otpInputs.current[index] = input)}
              style={styles.otpInput}
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              keyboardType="numeric"
            />
          ))}
        </View>

        {resendLoading ? (
          <ActivityIndicator size="small" color="#15718E" />
        ) : (
        <Text style={styles.resendText}>
          Didn't get a code?{' '}
          <Text
            style={[styles.resendButton, isResendDisabled && styles.disabledButton]}
            onPress={isResendDisabled ? null : handleResendOtp}
          >
            Resend {isResendDisabled && `(${countdown}s)`}
          </Text>
        </Text>
        )}

        <TouchableOpacity
          onPress={handleSubmit}
          style={[
            styles.verifyButton,
            !enteredOtp.every((digit) => digit) && styles.disabledButton,
          ]}
          disabled={!enteredOtp.every((digit) => digit)}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
    paddingHorizontal: 0, // Remove paddingHorizontal to avoid extra space
    paddingLeft: 0, // Remove paddingLeft to avoid extra space
    paddingTop: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'center',
    marginBottom: 24,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  otpInput: {
    width: 40,
    height: 40,
    margin: 4,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
  },
  resendText: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'center',
    marginBottom: 24,
  },
  resendButton: {
    color: '#319795',
  },
  verifyButton: {
    backgroundColor: '#3299a8',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 40, // adjust this value to your liking
    left: 20,
    right: 20,
  },
  verifyButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#cbd5e0',
  },
  texture: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});

export default VerifyPhone;
