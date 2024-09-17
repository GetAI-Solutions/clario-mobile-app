import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, SafeAreaView, ImageBackground, Alert } from 'react-native';
import Footer from '../components/Footer';
import NoProductHistory from './NoProductHistoryScreen';
import ProductList from './ProductList';
import DrawerButton from '../components/DrawerButton';
import ProductContext from '../context/ProductContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import SearchBar from '../components/SearchBar';
import { searchDetailsFromPerplexity } from '../services/apiService';
import UserContext from '../context/UserContext';
import CustomActivityIndicator from '../components/CustomActivityIndicator';

const MainScreen = ({ navigation }) => {
  const { products, loading } = useContext(ProductContext);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [searching, setSearching] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("Products in MainScreen:", products);
  }, [products]);

  const handleSearch = async (product_name) => {
    if (!product_name) return Alert.alert('Error', 'Please enter a product name');

    setSearching(true);
    try {
      const userID = user.uid;
      const response = await searchDetailsFromPerplexity(product_name, userID);
      console.log('response...', response)
      console.log('product...', response.data.product)


      if (response.data.product) {
        const transformedProduct = {
          product_name: response.data.product.product_name,
          product_summary: response.data.product.product_details,
          product_barcode: '3424353',
          perplexity: true,
        };
        console.log('transformed product', transformedProduct)
        setSearching(false);
        navigation.navigate('ProductDetails', { product: transformedProduct });
      } else if(response.status === 400) {
        setSearching(false)
        Alert.alert('Please search with a more precise name')
      }
      else {
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
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFF',
    },
    content: {
      flex: 1,
      marginBottom: 64,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#fff' : '#333',
      paddingLeft: 15,
      marginVertical: 30,
    },
    texture: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture} />
      <DrawerButton navigation={navigation} />
      <SearchBar onSearch={handleSearch} />
      <View style={styles.content}>
        {searching && <CustomActivityIndicator />}
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : products.length === 0 ? (
          <NoProductHistory onUpload={handleUpload} onScan={handleScan} />
        ) : (
          <>
            <Text style={styles.title}>{t('Scanned Products') || 'Scanned Products'}</Text>
            <ProductList navigation={navigation} />
          </>
        )}
      </View>
      <Footer onUpload={handleUpload} onScan={handleScan} />
    </SafeAreaView>
  );
};

export default MainScreen;