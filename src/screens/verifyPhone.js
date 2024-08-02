import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../components/Header';



const VerifyPhone = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const route = useRoute();
  const { phoneNumber, dialCode } = route.params || {};

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Automatically focus the next input field
    if (text && index < 5) {
      const nextInput = `otp-input-${index + 1}`;
      this[nextInput] && this[nextInput].focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    navigation.navigate('Login', {
      phoneNumber,
      dialCode,
    });
    console.log('Entered OTP:', enteredOtp);
    // Implement OTP verification logic here
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <View style={styles.content}>
        <Text style={styles.title}>Confirm Your Phone Number</Text>
        <Text style={styles.subtitle}>We've sent a code to {dialCode} {phoneNumber}</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={input => (this[`otp-input-${index}`] = input)}
              style={styles.otpInput}
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              keyboardType="numeric"
            />
          ))}
        </View>

        <Text style={styles.resendText}>
          Didn't get a code? <Text style={styles.resendButton}>Resend</Text>
        </Text>

        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.verifyButton, !otp.every(digit => digit) && styles.disabledButton]}
          disabled={!otp.every(digit => digit)}
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
    paddingHorizontal: 16,
    paddingLeft: 16,
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
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },
  verifyButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#cbd5e0',
  },
});

export default VerifyPhone;
