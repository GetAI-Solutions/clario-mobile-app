import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { BarcodeScanner } from 'expo-barcode-scanner';
import ProductContext from '../context/ProductContext';
import UserContext from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import { getProductSummary } from '../services/apiService';

const ScannerScreen = ({ navigation }) => {
  const { setProducts } = useContext(ProductContext);
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await BarcodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      requestPermissions();
    }
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log(`Type: ${type}, Data: ${data}`)
    setLoading(true);
    try {
      const bar_code = data; 
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
      console.error('Upload error:', err);
      handleError(err);
    } finally {
      setLoading(false);
      setStatusMessage('');
    }  
  };

  const handleError = (err) => {
    console.error('Error details:', { err });
  
    if (err.response) {
      switch (err.response.status) {
        case 400:
          navigation.navigate('ProductNotFound');
          break;
        case 401:
          setError(t('Unauthorized access.'));
          break;
        case 403:
          setError(t('Forbidden access.'));
          break;
        case 404:
          navigation.navigate('ProductNotFound');
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
  

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>{t('No access to camera')}</Text>;
  }

  return (
    <View style={styles.container}>
      <BarcodeScanner
        style={styles.cameraView}
        onBarCodeScanned={handleBarCodeScanned}
        facing="back"
      >
        {loading && <ActivityIndicator size="large" color="#fff" />}
        {error && (
          <View style={styles.overlay}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError(null)} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>{t('Try Again')}</Text>
            </TouchableOpacity>
          </View>
        )}
        {!loading && !error && (
          <View style={styles.scanPrompt}>
            <Text style={styles.scanText}>{t('Place the barcode inside the frame')}</Text>
          </View>
        )}
      </BarcodeScanner>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraView: {
    overflow: 'hidden',
    height: '60%',
    width: '80%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: '20%',
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
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
  scanPrompt: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanText: {
    color: '#fff',
    fontSize: 18,
  },

});

export default ScannerScreen;
