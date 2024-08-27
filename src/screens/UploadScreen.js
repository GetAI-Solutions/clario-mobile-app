import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadBarcode, getProductSummary } from '../services/apiService';
import { fetchImageFromUri } from '../utils/imageUtils';
import { registerForPushNotificationsAsync, sendNotification } from '../utils/notificationUtils';
import { Platform } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import Header from '../components/Header';
import ProductContext from '../context/ProductContext';
import UserContext from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const UploadScreen = ({ navigation }) => {
  const { setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const handleImagePick = async () => {
    console.log('handleImagePick called');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      ...(Platform.OS === 'web' ? { aspect: [4, 3] } : {}), 
    });
  
    console.log('ImagePicker result:', result);
  
    let bar_code = ''; // Declare bar_code here
    if (!result.canceled) {
      try {
        setLoading(true);
        setError(null);
        setStatusMessage(t('Extracting barcode...'));
  
        let formData = new FormData();
  
        if (Platform.OS === 'web') {
          const imageBlob = await fetchImageFromUri(result.assets[0].uri);
          formData.append('file', imageBlob);
        } else {
          setStatusMessage(t('Resizing image...'));
          const manipResult = await ImageManipulator.manipulateAsync(
            result.assets[0].uri,
            [{ resize: { width: 800, height: 600 } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
          );
          console.log('Resized image:', manipResult.uri);
          formData.append('file', {
            uri: manipResult.uri,
            name: 'image.jpg',
            type: 'image/jpeg',
          });
        }
  
        formData.append('id', user.uid);
        console.log('formData:', formData);
  
        const barcodeData = await uploadBarcode(formData);
        bar_code = barcodeData.product_barcode; // Assign value to the existing variable
        console.log("barcode...", bar_code);
  
        if (bar_code && bar_code !== '') {
          setStatusMessage(t('Barcode detected! Retrieving product details...'));
          const productData = await getProductSummary(bar_code, user.uid);
          console.log('barcode...', bar_code)
          console.log('response object...', productData)
          if (productData && productData.product) {
            const product = productData.product;
            setProduct(product);  
            setProducts((prev) => [...prev, product]);
            sendNotification(t('Product uploaded successfully!'));
            navigation.navigate('ProductDetails', { product });
          } else {
            console.log('barcode...', bar_code)
            navigation.navigate('ProductNotFound', { bar_code: bar_code });
          }
        } else {
          setError(t('No barcode detected.'));
        }
  
      } catch (err) {
        console.error('Upload error:', err);
        handleError(err, bar_code); // Pass the barcode variable here
      } finally {
        setLoading(false);
        setStatusMessage('');
      }
    }
  };
  

const handleError = ( err, bar_code ) => {
  console.error('Error details:', { err });

  if (err.response) {
    switch (err.response.status) {
      case 400:
        console.log('barcode...', bar_code)
        navigation.navigate('ProductNotFound', { bar_code: bar_code });
        break;
      case 401:
        setError(t('Unauthorized access.'));
        break;
      case 403:
        setError(t('Forbidden access.'));
        break;
      case 404:
        console.log('barcode...', bar_code)
        navigation.navigate('ProductNotFound', { bar_code: bar_code });
        break;
      case 408:
        setError(t('Request timeout.'));
        break;
      case 422:
        setError(t('Validation error. Please check your input.'));
        break;
      case 429:
        setError(t('Too many requests. Please try again later.'));
        break;
      case 500:
        setError(t('Internal server error.'));
        break;
      case 502:
        setError(t('Bad gateway.'));
        break;
      case 503:
        setError(t('Service unavailable.'));
        break;
      case 504:
        setError(t('Gateway timeout.'));
        break;
      default:
        setError(t('An error occurred. Please try again.'));
    }
  } else if (err.request) {
    setError(t('Network error. Please check your connection.'));
  } else {
    setError(t('Unknown error. Please try again.'));
  }
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#F0F0F0',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    uploadButton: {
      backgroundColor: '#319795',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    uploadButtonText: {
      color: '#FFF',
      fontSize: 16,
    },
    loadingContainer: {
      alignItems: 'center',
    },
    statusText: {
      color: theme === 'dark' ? '#FFF' : '#333',
      marginTop: 10,
    },
    errorContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    errorText: {
      color: '#FF0000',
      marginBottom: 20,
      fontSize: 18,
    },
    retryButton: {
      backgroundColor: '#FF0000',
      padding: 10,
      borderRadius: 5,
    },
    retryButtonText: {
      color: '#FFF',
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        {!product && !loading && !error && (
          <TouchableOpacity onPress={handleImagePick} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>{t('Upload Image')}</Text>
          </TouchableOpacity>
        )}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.statusText}>{statusMessage}</Text>
          </View>
        )}
        {error && !loading && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={handleImagePick} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>{t('Try another image')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default UploadScreen;