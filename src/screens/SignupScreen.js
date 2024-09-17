import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, ImageBackground } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/AuthHeader';
import { useTheme } from '../context/ThemeContext';

const SignupPhone = ({ navigation }) => {
  const { theme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ dial_code: '+251', name: 'Ethiopia' });

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleContinueClick = () => {
    if (phoneNumber && password) {
      setShowModal(true);
    } else {
      alert("Please enter a valid phone number and password.");
    }
  };

  const handleEditClick = () => {
    setShowModal(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleContinue = () => {
    setShowModal(false);
    navigation.navigate('EmailSignup', {
      phoneNumber,
      dialCode: selectedCountry.dial_code,
      password
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 16,
      boxSize: 'border-box',
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
    countryPicker: {
      marginRight: 8,
      paddingVertical: 10,
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
        <Text style={styles.subtitle}>Enter your mobile number to verify your account</Text>

        <View style={styles.inputWrapper}>
          <TouchableOpacity
            onPress={() => setShowCountryPicker(true)}
            style={styles.countryPicker}
          >
            <Text
            style={{color: '#000'}}>{selectedCountry.dial_code}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor={'#000'}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
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
        disabled={!phoneNumber || !password}
        style={[styles.button, (!phoneNumber || !password) ? styles.disabledButton : styles.activeButton]}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseText}>&times;</Text>
            </TouchableOpacity>
            <Image source={require('../../assets/images/pop.png')} style={styles.modalImage} />
            <Text style={styles.modalTitle}>Confirm Your Phone Number</Text>
            <Text style={styles.modalText}>Is this correct? {selectedCountry.dial_code} {phoneNumber}</Text>
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

export default SignupPhone;
