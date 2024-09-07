import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView, Modal, ImageBackground } from 'react-native';
import EmailInput from '../components/EmailInput';
import Header from '../components/AuthHeader';

const AddEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}/>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <EmailInput email={email} onEmailChange={setEmail} />
        <Image source={require('../../assets/images/Password.png')} style={styles.image}/>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>Enter your email address. We'll send an OTP to reset your password</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('OTPPage')}
          style={[styles.button, (!email) && styles.disabledButton]}
          disabled={!email}
        >
          {isLoading ? <ActivityIndicator color='#fff' /> : <Text style={styles.buttonText}>Signup</Text>}
        </TouchableOpacity>
      </ScrollView>
    </View>
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
    bottom: 20,
    position: 'fixed',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2c7391',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
  },
  texture: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    zIndex: -1,
  }
});

export default AddEmail;