import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Landing = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}/>
      <View style={styles.content}>
        <Image source={require('../../assets/images/Frame.png')} style={styles.logo} />
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
          By continuing you accept our <Text style={styles.link} onPress={() => Linking.openURL('#')}>Terms of Service</Text> and <Text style={styles.link} onPress={() => Linking.openURL('/')}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
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
  },
  description: {
    color: '#000',
    textAlign: 'center',
    marginBottom: 32,
    width: '80%',
  },
  signupButton: {
    width: '350px',
    paddingVertical: 16,
    backgroundColor: '#15718E',
    borderRadius: 100,
    marginBottom: 16,
  },
  signupButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginButton: {
    width: '350px',
    paddingVertical: 16,
    borderColor: '#15718E',
    borderWidth: 2,
    borderRadius: 100,
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#15718E',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: '#4a5568',
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

export default Landing;
