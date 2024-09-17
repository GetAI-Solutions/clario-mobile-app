import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, ImageBackground, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/AuthHeader';
import { useTheme } from '../context/ThemeContext';
import { sendOtp } from '../services/authService'; // Ensure the OTP service sends OTP via email now

const SignupEmail = ({ navigation }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(null); // To store the OTP returned by the sendOtp function

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleContinueClick = async () => {
    if (email && password) {
      setIsLoading(true)
      try {
        // Request OTP for the entered email
        const otpResponse = await sendOtp(email); // Update sendOtp to handle email logic
        console.log('otpResponse', otpResponse)
        if(otpResponse) {
          setIsLoading(false)
          const { otp } = otpResponse.data;
          console.log('otp...', otp)
          setOtp(otp);
          setShowModal(true);
        }
        
      } catch (error) {
        alert('Failed to send OTP, please try again.');
      }
    } else {
      alert("Please enter a valid email and password.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleContinue = () => {
    setShowModal(false);
    navigation.navigate('VerifyEmail', {
      email,
      password,
      otp,
    });
  };

  const handleEditClick = () => {
    setShowModal(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    content: {
      marginTop: 8,
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#000',
    },
    subtitle: {
      color: '#000',
      marginBottom: 24,
      fontWeight: "500",
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 10,
      paddingHorizontal: 8,
      marginBottom: 16,
      backgroundColor: 'transparent',
    },
    input: {
      flex: 1,
      height: 40,
      padding: 8,
    },
    toggleButton: {
      padding: 8,
    },
    button: {
      backgroundColor: '#2c7391',
      borderRadius: 28,
      alignItems: 'center',
      paddingVertical: 16,
      borderRadius: 100,
      marginTop: 24,
    },
    disabledButton: {
      backgroundColor: '#acacac',
    },
    activeButton: {
      backgroundColor: '#15718E',
    },
    buttonText: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'white',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 25,
      padding: 16,
      paddingBottom: 32,
      width: '90%',
      alignItems: 'center',
    },
    modalCloseButton: {
      position: 'absolute',
      top: 16,
      right: 16,
    },
    modalCloseText: {
      fontSize: 28,
      color: '#000',
    },
    modalImage: {
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#000',
      width: '90%',
      textAlign: 'center',
    },
    modalText: {
      fontSize: 14,
      color: '#000',
      marginBottom: 16,
    },
    modalButton: {
      width: '75%',
      paddingVertical: 8,
      borderRadius: 100,
      marginBottom: 8,
      fontWeight: '700',
    },
    modalOutlined: {
      borderColor: '#15718e',
      borderWidth: 2,
    },
    texture: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    }
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}/>
      <View style={styles.content}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Enter your email to verify your account</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor={'#000'}
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={'#000'}
            secureTextEntry={!showPassword} 
            value={password}
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
            <Icon name={showPassword ? "eye" : "eye-off"} size={24} color={'#daa163'} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        mode="contained"
        onPress={handleContinueClick}
        disabled={!email || !password}
        style={[styles.button, (!email || !password) ? styles.disabledButton : styles.activeButton]}
      >
      {isLoading ? <ActivityIndicator color='#fff' /> : <Text style={styles.buttonText}>Continue</Text>}
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseText}>&times;</Text>
            </TouchableOpacity>
            <Image source={require('../../assets/images/pop.png')} style={styles.modalImage} />
            <Text style={styles.modalTitle}>Confirm Your Email</Text>
            <Text style={styles.modalText}>Is this correct? {email}</Text>
            <Button 
              mode="contained" 
              onPress={handleContinue} 
              buttonColor="#15718E" 
              style={styles.modalButton}
              labelStyle={{
                color: 'white',
                fontSize: 16,
                fontWeight: '700',
              }}
            >
              <Text>Continue</Text>
            </Button>
            <Button
             mode="outlined" 
             onPress={handleEditClick}
             style={[styles.modalButton, styles.modalOutlined]}
             labelStyle={{
              color:  '#15718e',
              fontSize: 17,
              fontWeight: '700',
            }}
             >
              Edit
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SignupEmail;
