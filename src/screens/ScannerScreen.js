import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
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
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      }
    };
    requestPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log(`Type: ${type}, Data: ${data}`);
    setLoading(true);
    try {
      const bar_code = data;
      const productData = await getProductSummary(bar_code, user.uid);
      if (productData && productData.product) {
        const product = productData.product;
        setProduct(product);
        setProducts((prev) => [...prev, product]);
        navigation.navigate('ProductDetails', { product });
      } else {
        console.log('barcode...', bar_code);
        navigation.navigate('ProductNotFound', { bar_code: bar_code });
      }
    } catch (err) {
      console.error('Upload error:', err);
      handleError(err, bar_code); // Pass bar_code to handleError
    } finally {
      setLoading(false);
    }
  };
  
  const handleError = (err, bar_code) => {
    if (err.response) {
      switch (err.response.status) {
        case 400:
          console.log('barcode...', bar_code);
          navigation.navigate('ProductNotFound', { bar_code: bar_code });
          break;
        case 401:
          setError(t('Unauthorized access.'));
          break;
        case 403:
          setError(t('Forbidden access.'));
          break;
        case 404:
          console.log('barcode...', bar_code);
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
  
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>{t('No access to camera')}</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={styles.cameraView}
        onBarCodeScanned={handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
      >
        <View style={styles.cornerContainer}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
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
      </BarCodeScanner>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000', // Dark background for better contrast
  },
  cameraView: {
    height: '60%',
    width: '90%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: '20%',
    overflow: 'hidden',
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
  cornerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    padding: 20,
  },
  corner: {
    width: 50,
    height: 50,
    borderColor: '#fff',
    borderWidth: 3,
  },
  topLeft: {
    borderTopLeftRadius: 20,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    borderTopRightRadius: 20,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    borderBottomLeftRadius: 20,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    borderBottomRightRadius: 20,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
});

export default ScannerScreen;