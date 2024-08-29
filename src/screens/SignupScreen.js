import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, ImageBackground } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';

const SignupPhone = ({ navigation }) => {
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
    // Check if phone number and password are filled
    if (phoneNumber && password) {
      setShowModal(true);
    } else {
      // Optionally show an error message if inputs are not valid
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
            <Text>{selectedCountry.dial_code}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
            <Icon name={showPassword ? "eye" : "eye-off"} size={24} color="#000" />
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
            >
              <Text>Continue</Text>
            </Button>
            <Button mode="outlined" onPress={handleEditClick} style={styles.modalButton}>
            <Text>Edit</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  subtitle: {
    color: '#000',
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: 'white',
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
    paddingVertical: 12,
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
    width: '80%',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  modalCloseText: {
    fontSize: 28,
  },
  modalImage: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalText: {
    color: '#000',
    marginBottom: 16,
  },
  modalButton: {
    width: '80%',
    paddingVertical: 8,
    borderRadius: 100,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  texture: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    zIndex: -1,
  }
});

export default SignupPhone;
