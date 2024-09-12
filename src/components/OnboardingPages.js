import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0); // 
  const swiperRef = useRef(null);

  const dotColors = ['#15718e', '#daa163', '#000'];

  const handleNext = () => {
    if (activeIndex < 2) {
      setActiveIndex((prevIndex) => {
        swiperRef.current.scrollBy(1);
        return (prevIndex + 1);
      }); // Navigate to the next slide
    } else {
      navigation.navigate('Landing'); // Navigate to the next screen after the last slide
    }
  };


  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: '#fff',
    },
    slide: {
      flex: 1,
      alignItems: 'center',
      padding: 35,
    },
    image1: {
      marginTop: 100,
      marginBottom: -50,
      width: '100%',
      resizeMode: 'contain',
    },
    image2: {
      marginTop: 80,
      marginBottom: -20,
      width: '110%',
      resizeMode: 'contain',
    },
    image3: {
      marginTop: 120,
      marginBottom: 20,
      width: '100%',
      resizeMode: 'contain',
    },
    title: {
      fontFamily: 'Antipasto Pro',
      fontSize: 40,
      fontWeight: 'bold',
      marginTop: 20,
      lineHeight: 36,
    },
    subtitle: {
      fontSize: 16,
      marginTop: 10,
      color: '#888',
    },
    dot: {
      backgroundColor: '#d9d9d9',
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 4,
    },
    activeDot: {
      backgroundColor: dotColors[activeIndex],
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    pagination: {
      bottom: 120,
    },
    button: {
      position: 'absolute',
      marginTop: 30,
      paddingVertical: 18,
      width: '90%',
      borderRadius: 50,
      bottom: 20,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 800,
      textAlign: 'center',
      fontSize: 17,
    },
    texture: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    },
  });

  return (
    <Swiper
      ref={swiperRef}
      index={activeIndex} // Control the current slide using the activeIndex state
      onIndexChanged={(index) => setActiveIndex(index)} // Update state when the user swipes manually
      style={styles.wrapper}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      paginationStyle={styles.pagination}
      loop={false}
      scrollEnabled={false}
    >
      <View style={styles.slide}>
        <ImageBackground source={'../../assets/images/texture.png'} style={styles.texture}/>
        <Image source={require('../../assets/images/wondering.png')} style={styles.image1} />
        <Text style={[styles.title, { color: '#15718e' }]}>
          Explore Products with AI-Powered Insights
        </Text>
        <Text style={[styles.subtitle, { color: '#000' }]}>
          Discover everything about the products you use or plan to try with our smart AI-powered chatbot!
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#15718e' }]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.slide, { backgroundColor: '#15718e' }]}>
        <ImageBackground source={'../../assets/images/texture.png'} style={styles.texture}/>
        <Image source={require('../../assets/images/searching.png')} style={styles.image2} />
        <Text style={[styles.title, { color: '#daa163' }]}>Scan, Search, Discover!</Text>
        <Text style={[styles.subtitle, { color: '#fff' }]}>
          Instantly scan barcodes for quick product details at your fingertips. Can’t find a barcode? Search by name and still get the info you need in a flash.
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#daa163' }]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.slide, { backgroundColor: '#daa163' }]}>
        <ImageBackground source={'../../assets/images/texture.png'} style={styles.texture}/>
        <Image source={require('../../assets/images/global.png')} style={styles.image3} />
        <Text style={[styles.title, { color: '#000' }]}>Speak Your Language, Anytime!</Text>
        <Text style={[styles.subtitle, { color: '#fff' }]}>
          We’ve got you covered in English, Swahili, Amharic, and more – get instant answers in the language that speaks to you.
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#000' }]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {activeIndex === 2 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};



export default OnboardingScreen;
