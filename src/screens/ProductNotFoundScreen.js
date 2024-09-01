import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { BASEURL } from '../services/api';
import { chatPerplexityAi, getDetailsFromPerplexity } from '../services/apiService';
import ProductContext from '../context/ProductContext';
import UserContext from '../context/UserContext';


const ProductNotFoundScreen = ({ navigation, route }) => {
  const { bar_code } = route.params;
  const [productName, setProductName] = useState('');
  const [product, setProduct] = useState(null);
  const { setProducts } = useContext(ProductContext)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { user } = useContext(UserContext)

  const handleSearch = async () => {
    if (!bar_code) {
      console.error('bar_code is not defined');
      return;
    }
    console.log('barcode...', bar_code)
    setLoading(true);
    try {
      const userID = user.uid
      const response = await getDetailsFromPerplexity(productName, bar_code, userID);
      console.log('response object...', response)
      console.log("Navigating with product:", response.data);
      console.log("product details..", response.data.product.product_details)
      
      if (response.data) {
        // Map the product details to the expected keys
        const mappedProduct = {
          product_summary: response.data.product.product_details, // Example of renaming
          product_name: response.data.product.product_name,
          product_barcode: response.data.product.product_code,
          perplexity: true,
        }




        navigation.navigate('ProductDetails', { product: mappedProduct });
      }else if (response.status === 400) {
        setError(t('Please provide a more specific product name'));
      } else {
        setError(t('An error occurred while searching for the product'));
      }
    } catch (error) {
      setError(t('An error occurred while searching for the product'));
    } finally {
      setLoading(false);
    }
  };


  const handleUpload = () => {
    navigation.navigate('UploadScreen');
  };

  const handleScan = () => {
    navigation.navigate('ScannerScreen');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFF',
      paddingHorizontal: 20,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    imageContainer: {
      position: 'relative',
      marginBottom: 20,
      marginTop: 100,
    },
    placardImage: {
      width: 150,
      height: 150,
      position: 'absolute',
      top: 0,
      zIndex: 1,
    },
    personImage: {
      width: 150,
      height: 150,
    },
    messageText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#fff' : '#000',
      marginBottom: 10,
      textAlign: 'center',
    },
    suggestionText: {
      fontSize: 16,
      color: theme === 'dark' ? '#aaa' : '#666',
      marginBottom: 20,
      textAlign: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#bbb' : '#319795',
      borderRadius: 25,
      paddingHorizontal: 10,
      width: '100%',
      marginBottom: 220,
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
    },
    input: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 8,
      fontSize: 16,
      color: theme === 'dark' ? '#fff' : '#000',
    },
    searchButton: {
      padding: 8,
      backgroundColor: theme === 'dark' ? '#2c7391' : '#2c7391',
      borderRadius: 20,
      marginLeft: -10,
    },
    searchIcon: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    sendIcon: {
      width: 20,
      height: 20,
    },
    searchButtonText: {
      fontSize: 20,
    },
    optionButton: {
      backgroundColor: '#319795',
      padding: 10,
      borderRadius: 25,
      alignItems: 'center',
      width: 100,
    },
    optionButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/placard.png')} style={styles.placardImage} />
          <Image source={require('../../assets/images/person.png')} style={styles.personImage} />
        </View>
        <Text style={styles.messageText}>{t("We Couldn't Find Your Product")}</Text>
        <Text style={styles.suggestionText}>
          {t('We might not have your product yet, try searching by name.')}
        </Text>

        <View style={styles.inputContainer}>
          <Image source={require('../../assets/images/search.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder={t('Enter name of product')}
            placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
            value={productName}
            onChangeText={setProductName}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Image source={require('../../assets/images/send.png')} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
        {loading && <Text>Loading...</Text>}
        {error && <Text>{error}</Text>}

        <Footer onUpload={handleUpload} onScan={handleScan} />
      </View>
    </View>
  );
};

export default ProductNotFoundScreen;