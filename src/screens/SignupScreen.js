import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const SignupPhone = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ cca2: 'ET', name: 'Ethiopia', callingCode: ['251'] });
  const navigation = useNavigation();

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignUpClick = () => {
    setShowModal(true);
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
      dialCode: `+${selectedCountry.callingCode[0]}`
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Enter your mobile number to verify your account</Text>

        <View style={styles.inputWrapper}>
          <CountryPicker
            countryCode={selectedCountry.cca2}
            withFlag
            withCallingCode
            onSelect={country => setSelectedCountry(country)}
            containerButtonStyle={styles.countryPicker}
          />
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
            <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <Button
        mode="contained"
        onPress={handleSignUpClick}
        disabled={!phoneNumber || !password}
        style={[styles.button, (!phoneNumber || !password) ? styles.disabledButton : styles.activeButton]}
      >
        Sign up
      </Button>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseText}>&times;</Text>
            </TouchableOpacity>
            <Image source={require('../../assets/images/pop.png')} style={styles.modalImage} />
            <Text style={styles.modalTitle}>Confirm Your Phone Number</Text>
            <Text style={styles.modalText}>Is this correct? +{selectedCountry.callingCode[0]} {phoneNumber}</Text>
            <Button 
              mode="contained" 
              onPress={handleContinue} 
              buttonColor="#319795" 
              style={styles.modalButton}
            >
              Continue
            </Button>
            <Button mode="outlined" onPress={handleEditClick} style={styles.modalButton}>
              Edit
            </Button>
          </View>
        </View>
      </Modal>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 8,
    marginBottom: 16,
  },
  content: {
    marginTop: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  countryPicker: {
    marginRight: 8,
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
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  activeButton: {
    backgroundColor: '#319795',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  modalCloseText: {
    fontSize: 24,
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
    color: '#6b7280',
    marginBottom: 16,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    color: '#319795',
  },
});

export default SignupPhone;