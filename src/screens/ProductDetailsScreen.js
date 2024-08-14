import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { t } = useTranslation();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { theme } = useTheme();

  const truncatedDescription = product.product_summary.length > 150
    ? product.product_summary.slice(0, 150) + '...'
    : product.product_summary;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
    },
    content: {
      alignItems: 'center',
      padding: 20,
    },
    productContainer: {
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#333' : '#F8F8F8',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 3,
      marginBottom: 20,
      borderColor: '#2c7391',
    },
    productImage: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
      marginBottom: 20,
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
      color: '#2c7391',
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
      fontSize: 16,
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.productContainer}>
          <Image 
            source={product.image_url && product.image_url !== "soon" ? { uri: product.imageurl } : require('../../assets/images/else.png')} 
            style={styles.productImage} 
          />
          <Text style={styles.productName}>{product.product_name}</Text>
          <Text style={styles.productDescription}>
            {showFullDescription ? product.product_summary : truncatedDescription}
          </Text>
          {product.product_summary.length > 150 && (
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={styles.readMoreText}>
                {showFullDescription ? t('Read Less') : t('Read More')}
              </Text>
            </TouchableOpacity>
          )}
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