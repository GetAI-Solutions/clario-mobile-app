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

const UploadScreen = ({ navigation }) => {
  const { setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const { user, setUser } = useContext(UserContext)
  const { t } = useTranslation()

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      setError(null);
      setStatusMessage(t('Extracting barcode...'));

      try {
        const formData = new FormData();
        formData.append('file', await fetchImageFromUri(result.assets[0].uri));
        formData.append('id', user.uid);

        const barcodeData = await uploadBarcode(formData);
        const bar_code = barcodeData.product_barcode;
        console.log(bar_code)
        console.log(user.uid)

        if (!bar_code) {
          setLoading(true);
          navigation.navigate('ProductNotFound');
        }

        setStatusMessage(t('Barcode detected! Retrieving product details...'));

        const productData = await getProductSummary(bar_code);

        if (productData && productData.product) {
          const product = productData.product
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
    if (err.response) {
      switch (err.response.status) {
        case 400:
          setError('Invalid barcode format.');
          break;
        case 401:
          setError('Unauthorized access. Please check your API key.');
          break;
        case 404:
          navigation.navigate('ProductNotFound');
          break;
        case 429:
          setError('Too many requests. Please try again later.');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    } else {
      setError('Network error. Please check your connection.');
    }
  };

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
            <Text style={styles.statusText}>{statusMessage}</Text> {/* Display status message */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hamburgerIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
    color: '#fff',
    fontSize: 16,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#ff0000',
    marginBottom: 20,
    fontSize: 18,
  },
  retryButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UploadScreen;
