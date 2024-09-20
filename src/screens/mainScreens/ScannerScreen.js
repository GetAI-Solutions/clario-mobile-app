import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProductContext from '../../context/ProductContext';
import UserContext from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { getProductSummary } from '../../services/apiService';
import { Ionicons } from '@expo/vector-icons';

const ScannerScreen = ({ navigation }) => {
  const { setProducts } = useContext(ProductContext);
  const { user } = useContext(UserContext);
  const [scanned, setScanned] = useState(false);
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
        console.log('Product not found, barcode:', bar_code);
        navigation.navigate('ProductNotFound', { bar_code: bar_code });
      }
    } catch (err) {
      console.error('Upload error:', err);
      handleError(err, data);  
    } finally {
      setLoading(false);
    }
  };
  
  const handleError = (err, bar_code) => {
    if (err.response) {
      switch (err.response.status) {
        case 404:
          navigation.navigate('ProductNotFound', { bar_code });
          break;
        // Add more cases here based on the error status
        default:
          setError(t('An error occurred. Please try again.'));
      }
    } else if (err.request) {
      setError(t('Network error. Please check your connection.'));
    } else {
      setError(t('Unknown error. Please try again.'));
    }

    setLoading(false);
    navigation.navigate('MainScreen');
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
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.aztec,
          BarCodeScanner.Constants.BarCodeType.codabar,
          BarCodeScanner.Constants.BarCodeType.code39,
          BarCodeScanner.Constants.BarCodeType.code93,
          BarCodeScanner.Constants.BarCodeType.code128,
          BarCodeScanner.Constants.BarCodeType.datamatrix,
          BarCodeScanner.Constants.BarCodeType.ean13,
          BarCodeScanner.Constants.BarCodeType.ean8,
          BarCodeScanner.Constants.BarCodeType.itf14,
          BarCodeScanner.Constants.BarCodeType.pdf417,
          BarCodeScanner.Constants.BarCodeType.qr,
          BarCodeScanner.Constants.BarCodeType.upc_a,
          BarCodeScanner.Constants.BarCodeType.upc_e,
          BarCodeScanner.Constants.BarCodeType.interleaved2of5,
          BarCodeScanner.Constants.BarCodeType.rss14,
          BarCodeScanner.Constants.BarCodeType.rss_expanded,
        ]}
      >
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>{t('Scanning product...')}</Text>
          </View>
        )}

        {error && (
          <View style={styles.overlay}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => { setError(null); setScanned(false); }} style={styles.retryButton}>
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
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('MainTabScreen')}
      >
        <Ionicons name="home" size={24} color="white" />
        <Text style={styles.homeButtonText}>{t('Home')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  cameraView: {
    height: '60%',
    width: '80%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: '20%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
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
  homeButton: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'tomato',
    borderRadius: 5,
  },
  homeButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
});

export default ScannerScreen;
