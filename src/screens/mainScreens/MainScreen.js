import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ImageBackground, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Footer from '../../components/Footer';
import NoProductHistory from './NoProductHistoryScreen';
import ProductList from './ProductList';
import DrawerButton from '../../components/DrawerButton';
import ProductContext from '../../context/ProductContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import SearchBar from '../../components/SearchBar';
import { searchDetailsFromPerplexity } from '../../services/apiService';
import UserContext from '../../context/UserContext';

const MainScreen = ({ navigation }) => {
  const { products, loading, setProducts } = useContext(ProductContext);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [searching, setSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("Products in MainScreen:", products);
  }, [products]);

  useEffect(() => {
    let messageInterval;
    if (searching) {
      const messages = [
        t('Looking for your product...'),
        t('Almost there! Sit back while we fetch the details...'),
        t('Just a moment, we’re getting the information you need...'),
        t('Hang tight, we’re locating your product details...')
      ];
      let messageIndex = 0;

      const updateMessage = () => {
        setSearchMessage(messages[messageIndex]);
        messageIndex = (messageIndex + 1) % messages.length;
      };

      messageInterval = setInterval(updateMessage, 4000); 
      updateMessage(); 

    } else {
      setSearchMessage('');
      if (messageInterval) clearInterval(messageInterval);
    }

    return () => clearInterval(messageInterval);
  }, [searching]);

  const handleSearch = async (product_name) => {
    if (!product_name) return Alert.alert('Error', 'Please enter a product name');

    setSearching(true);
    try {
      const userID = user.uid;
      const response = await searchDetailsFromPerplexity(product_name, userID);
      console.log('response...', response);
      console.log('product...', response.data.product);

      if (response.data.product) {
        const transformedProduct = {
          product_name: response.data.product.product_name,
          product_summary: response.data.product.product_details,
          product_barcode: response.data.product.product_code,
          perplexity: true,
          noCode: true,
          noCode: true,
        };
        console.log('transformed product', transformedProduct);
        setProducts((prev) => [...prev, transformedProduct]);
        setSearching(false);
        navigation.navigate('ProductDetails', { product: transformedProduct });
      } else if (response.status === 400) {
        setSearching(false);
        Alert.alert('Please search with a more precise name');
      } else {
        setSearching(false);
        Alert.alert('Error', 'Product not found');
      }
    } catch (error) {
      
      setSearching(false);
      Alert.alert('Error', 'Failed to fetch product');
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
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    header: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    drawerButton: {
      marginHorizontal: 10,
    },
    searchContainer: {
      flex: 1,
      marginHorizontal: 10,
      justifyContent: 'center',
    },
    content: {
      flex: 1,
      marginBottom: 64,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#fff' : '#333',
      paddingHorizontal: 15,
      marginVertical: 20,
    },
    texture: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFF',
    },
    textureWrapper: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFF',
    },
    searchMessage: {
      fontSize: 14, // Adjusted to be smaller
      color: theme === 'dark' ? '#fff' : '#333',
      textAlign: 'center',
      marginVertical: 10,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textureWrapper}>
        <ImageBackground source={require('../../../assets/images/texture.png')} style={styles.texture}>
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <DrawerButton navigation={navigation} style={styles.drawerButton} />
              <View style={styles.searchContainer}>
                <SearchBar onSearch={handleSearch} isLoading={searching} />
              </View>
            </View>
          </View>
          <View style={styles.content}>
            {searching && <Text style={styles.searchMessage}>{searchMessage}</Text>}
            {products.length === 0 ? (
               <KeyboardAvoidingView
               behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
               style={{ flex: 1 }}  // Ensure it takes up full height
             >
               <NoProductHistory onUpload={handleUpload} onScan={handleScan} />
             </KeyboardAvoidingView>
            ) : (
              <>
                <Text style={styles.title}>{t('Scanned Products') || 'Scanned Products'}</Text>
                <ProductList navigation={navigation} />
              </>
            )}
          </View>
          <Footer onUpload={handleUpload} onScan={handleScan} />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
