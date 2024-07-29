import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const OnboardingScreen = ({ navigation }) => {
  useEffect(() => {
    // Navigate to the LandingScreen after 3 seconds
    setTimeout(() => {
      navigation.replace('Landing');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo2.png')} style={styles.logo} />
      <Animatable.Text 
        animation="slideInLeft" 
        iterationCount={1} 
        style={styles.text}>
        GetAI
      </Animatable.Text>
      <ActivityIndicator size="large" color="#fff" style={styles.indicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  indicator: {
    marginTop: 20,
  },
});

export default OnboardingScreen;
