import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const Landing = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme === 'light' ? '#fff' : '#2a2a2a',
      paddingHorizontal: 16,
    },
    content: {
      alignItems: 'center',
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
      width: 350, // Changed from '350px'
      paddingVertical: 16,
      backgroundColor: '#15718E',
      borderRadius: 100,
      marginBottom: 18,
    },
    signupButtonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 800, // Retained as a string
      fontSize: 16, // Changed from '1.2em'
      letterSpacing: 1,
    },
    loginButton: {
      width: 350, // Changed from '350px'
      paddingVertical: 16,
      borderColor: theme === 'light' ? '#15718E' : '#daa163',
      borderWidth: 2,
      borderRadius: 100,
      marginBottom: 20,
    },
    loginButtonText: {
      color: theme === 'light' ? '#15718E' : '#daa163',
      textAlign: 'center',
      fontWeight: 800, // Retained as a string
      fontSize: 16, // Changed from '1.2em'
    },
    footerText: {
      flexDirection: 'column', // Changed from 'display: flex'
      fontSize: 12, // Changed from '0.8em'
      color: theme === 'light' ? '#4a5568' : '#fff',
      textAlign: 'center',
    },
    link: {
      textDecorationLine: 'underline',
    },
    texture: {
      ...StyleSheet.absoluteFillObject,
      width: '100%', 
      height: '100%',
    }
  });
  
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}/>
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
            <Text style={styles.link} onPress={() => Linking.openURL('#')}>Terms of Service</Text> and <Text style={styles.link} onPress={() => Linking.openURL('#')}>Privacy Policy</Text>
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Landing;

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const Landing = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme === 'light' ? '#fff' : '#2a2a2a',
      paddingHorizontal: 16,
    },
    content: {
      alignItems: 'center',
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
      width: 350, // Changed from '350px'
      paddingVertical: 16,
      backgroundColor: '#15718E',
      borderRadius: 100,
      marginBottom: 18,
    },
    signupButtonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: '800', // Retained as a string
      fontSize: 16, // Changed from '1.2em'
      letterSpacing: 1,
    },
    loginButton: {
      width: 350, // Changed from '350px'
      paddingVertical: 16,
      borderColor: theme === 'light' ? '#15718E' : '#daa163',
      borderWidth: 2,
      borderRadius: 100,
      marginBottom: 20,
    },
    loginButtonText: {
      color: theme === 'light' ? '#15718E' : '#daa163',
      textAlign: 'center',
      fontWeight: '800', // Retained as a string
      fontSize: 16, // Changed from '1.2em'
    },
    footerText: {
      flexDirection: 'column', // Changed from 'display: flex'
      fontSize: 12, // Changed from '0.8em'
      color: theme === 'light' ? '#4a5568' : '#fff',
      textAlign: 'center',
    },
    link: {
      textDecorationLine: 'underline',
    },
    texture: {
      ...StyleSheet.absoluteFillObject,
      width: '100%', 
      height: '100%',
    }
  });
  
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}/>
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
            <Text style={styles.link} onPress={() => Linking.openURL('#')}>Terms of Service</Text> and <Text style={styles.link} onPress={() => Linking.openURL('#')}>Privacy Policy</Text>
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Landing;
