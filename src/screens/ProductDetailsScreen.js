import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,ImageBackground, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

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
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
      paddingHorizontal: 20,
    },
    content: {
      alignItems: 'center',
      padding: 20,
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
      borderColor: '#2c7391',
    },
    textContainer: {
      padding: 20,
    },
    productImage: {
      width: 120,
      height: 200,
      resizeMode: 'cover',
      marginBottom: 20,
      borderRadius: 30,
    },
    productName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#FFF' : '#333',
      marginBottom: 10,
      textAlign: 'center',
    },
    productDescription: {
      fontSize: 14,
      color: theme === 'dark' ? '#CCC' : '#666',
      marginBottom: 10,
      textAlign: 'center',
    },
    readMoreText: {
      fontSize: 14,
      color: '#daa163',
      marginBottom: 20,
      textAlign: 'right',
    },
    chatbotButton: {
      backgroundColor: '#2c7391',
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
    texture: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    }
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}/>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.productContainer}>
        <Image 
          source={
            // Check if image_url is a remote URI or a local image
            typeof product.image_url === 'string' && product.image_url !== "" 
              ? { uri: product.image_url } 
              : product.image_url || require('../../assets/images/else.png')
          } 
          style={styles.productImage} 
         />
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
    </View>
  );
};

export default ProductDetailsScreen;