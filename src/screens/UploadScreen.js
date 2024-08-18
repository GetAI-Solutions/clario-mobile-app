import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadBarcode, getProductSummary } from '../services/apiService';
import { fetchImageFromUri } from '../utils/imageUtils';
import { registerForPushNotificationsAsync, sendNotification } from '../utils/notificationUtils';
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
      aspect: [4, 3],
      quality: 1,
    });

    console.log('ImagePicker result:', result);
    console.log('Image URI:', result.assets[0].uri);


    if (!result.canceled) {
      setLoading(true);
      setError(null);
      setStatusMessage(t('Extracting barcode...'));

      try {
        const formData = new FormData();
        formData.append('file', await fetchImageFromUri(result.assets[0].uri));
        formData.append('id', user.uid);
        console.log('formData:', formData);
        console.log(user.uid)

        const barcodeData = await uploadBarcode(formData);
        const bar_code = barcodeData.product_barcode;
        console.log(bar_code)

        if (!bar_code) {
          setLoading(true);
          navigation.navigate('ProductNotFound');
        }

        setStatusMessage(t('Barcode detected! Retrieving product details...'));

        const productData = await getProductSummary(bar_code, user.uid);

        if (productData && productData.product) {
          const product = productData.product;
          setProduct(product);
          setProducts((prev) => [...prev, product]);
          sendNotification(t('Product uploaded successfully!'));
          navigation.navigate('ProductDetails', { product });
        } else {
          navigation.navigate('ProductNotFound');
        }
      } catch (err) {
        console.error(err);
        handleError(err);
      } finally {
        setLoading(false);
        setStatusMessage('');
      }
    }
  };

  const handleError = (err) => {
    console.error('Error details:', { err } );
    if (err.response) {
      switch (err.response.status) {
        case 400:
          navigation.navigate('ProductNotFound')
          break;
        case 401:
          setError(t('Unauthorized access.'));
          break;
        case 404:
          navigation.navigate('ProductNotFound');
          break;
        case 429:
          setError(t('Too many requests. Please try again later.'));
          break;
        default:
          setError(t('An error occurred. Please try again.'));
      }
    } else {
      setError(t('Network error. Please check your connection.'));
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