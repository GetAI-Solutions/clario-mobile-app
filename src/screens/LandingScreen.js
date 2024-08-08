import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Landing = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../../assets/images/Frame.png')} style={styles.logo} />
        <Image source={require('../../assets/images/logo.png')} style={styles.mainLogo} />
        <View style={styles.first}>
          <Text style={styles.title}>Create your</Text>
          <Text style={styles.title}>GetAI account</Text>
        </View>
        <View style={styles.second}>
          <Text style={styles.description}>GetAI is an AI-powered barcode scanner</Text>
          <Text style={styles.description}>providing comprehensive, localized product</Text>
          <Text style={styles.description}>information for African consumers.</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          <Text>By continuing you accept our </Text>
          <Text style={styles.link} onPress={() => Linking.openURL('#')}>Terms of Service</Text> and <Text style={styles.link} onPress={() => Linking.openURL('/')}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f7fafc',
    paddingHorizontal: 16,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 24,
  },
  mainLogo: {
    width: 160,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  first: {
    marginBottom: 9,
  },
  second: {
    marginBottom: 10,
  },
  description: {
    color: '#4a5568',
    textAlign: 'center',
    marginBottom: 1,
  },
  signupButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#3299a8',
    borderRadius: 20,
    marginBottom: 16,
  },
  signupButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginButton: {
    width: '100%',
    paddingVertical: 12,
    borderColor: '#319795',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#319795',
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
});

export default Landing;
