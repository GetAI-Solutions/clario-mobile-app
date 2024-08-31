import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ImageBackground } from 'react-native';
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
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}/>
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
    backgroundColor: '#15718E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'Antipasto Pro',
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  indicator: {
    marginTop: 20,
  },
  texture: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
});

export default OnboardingScreen;
