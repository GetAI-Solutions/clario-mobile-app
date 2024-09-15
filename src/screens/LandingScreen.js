import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const Landing = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,  // Ensure the content fills the available space
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    logo: {
      width: 50,
      height: 50,
      marginBottom: 24,
      resizeMode: 'contain',
    },
    mainLogo: {
      width: 160,
      height: 120,
      marginBottom: 24,
    },
    title: {
      width: '50%',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
      color: theme === 'light' ? '#000' : '#daa163',
    },
    description: {
      color: theme === 'light' ? '#000' : '#fff',
      textAlign: 'center',
      marginBottom: 32,
      width: '80%',
    },
    signupButton: {
      width: 350,
      paddingVertical: 16,
      backgroundColor: '#15718E',
      borderRadius: 100,
      marginBottom: 18,
    },
    signupButtonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: '800',
      fontSize: 16,
      letterSpacing: 1,
    },
    loginButton: {
      width: 350,
      paddingVertical: 16,
      borderColor: theme === 'light' ? '#15718E' : '#daa163',
      borderWidth: 2,
      borderRadius: 100,
      marginBottom: 20,
    },
    loginButtonText: {
      color: theme === 'light' ? '#15718E' : '#daa163',
      textAlign: 'center',
      fontWeight: '800',
      fontSize: 16,
    },
    footerText: {
      flexDirection: 'column',
      fontSize: 12,
      color: theme === 'light' ? '#4a5568' : '#fff',
      textAlign: 'center',
    },
    link: {
      textDecorationLine: 'underline',
    },
    texture: {
      flex: 1,  // Ensures the background image covers the entire screen
      width: '100%',
      height: '100%',
      resizeMode: 'cover',  // Ensures the image resizes to cover the whole screen
    },
  });

  return (
    <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={require('../../assets/images/getai.png')} style={styles.logo} />
          <Image source={require('../../assets/images/logo.png')} style={styles.mainLogo} />
          <Text style={styles.title}>Create your GetAI account</Text>
          <Text style={styles.description}>
            GetAI is an AI-powered barcode scanner providing comprehensive, localized product information for African consumers.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>
            <Text>By continuing you accept our </Text>
            <Text>
              <Text style={styles.link} onPress={() => Linking.openURL('Terms')}>Terms of Service</Text> and <Text style={styles.link} onPress={() => Linking.openURL('#')}>Privacy Policy</Text>
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Landing;
