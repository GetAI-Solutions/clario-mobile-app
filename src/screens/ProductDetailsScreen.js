import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { t } = useTranslation();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { theme } = useTheme();

  const cleanText = (text) => text.replace(/[#*]+/g, '');

  const truncatedDescription = cleanText(product.product_summary).length > 150
    ? cleanText(product.product_summary).slice(0, 150) + '...'
    : cleanText(product.product_summary);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#1e1e1e' : '#FFF', // Set background color based on theme
    },
    content: {
      alignItems: 'center',
    },
    productContainer: {
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#333' : '#F8F8F8',
      borderRadius: 30,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 3,
      marginBottom: 20,
      width: '85%',
    },
    textContainer: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    productImageContainer: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 30,
      border: 0,
    },
    productImage: {
      width: '100%',
      height: 330,
      resizeMode: 'cover',
      borderRadius: 30,
    },
    productName: {
      fontSize: 22,
      fontWeight: '800',
      color: '#FFF',
      marginBottom: 10,
      textAlign: 'center',
      paddingHorizontal: 20,
    },
    productDescription: {
      fontSize: 14,
      color: '#fff',
      marginBottom: 10,
      textAlign: 'center',
    },
    readMoreText: {
      fontSize: 14,
      color: '#fff',
      marginBottom: 20,
      textAlign: 'right',
    },
    chatbotButton: {
      backgroundColor:  '#15718e',
      padding: 15,
      borderRadius: 50,
      width: '80%',
      alignItems: 'center',
      alignSelf: 'center',
    },
    chatbotButtonText: {
      fontSize: 17,
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: '700',
    },
    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
  },
    texture: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}>
        <Header navigation={navigation} />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.productContainer}>
            <View style={styles.productImageContainer}>
            <Image 
              source={
                typeof product.image_url === 'string' && product.image_url !== "" 
                  ? { uri: product.image_url } 
                  : product.image_url || require('../../assets/images/else.png')
              } 
              style={styles.productImage} 
            />
            </View>
            <LinearGradient
            colors={['rgba(217, 217, 217, 0)', '#15718e' ]}
            start={{ x: 0.5, y: 0.1 }}
            end={{ x: 0.5, y: .5 }} 
            style={styles.gradient}
            >
            </LinearGradient>
            <View style={styles.textContainer}>
              <Text style={styles.productName}>{cleanText(product.product_name)}</Text>
              <Text style={styles.productDescription}>
                {showFullDescription ? cleanText(product.product_summary) : truncatedDescription}
              </Text>
              {product.product_summary.length > 150 && (
                <TouchableOpacity onPress={toggleDescription}>
                  <Text style={styles.readMoreText}>
                    {showFullDescription ? t('Read Less') : t('Read More')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Chatbot', { product })}
            style={styles.chatbotButton}
          >
            <Text style={styles.chatbotButtonText}>{t('Proceed to Chatbot')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ProductDetailsScreen;
