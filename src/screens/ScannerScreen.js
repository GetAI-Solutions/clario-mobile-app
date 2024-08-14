import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { CameraView } from 'expo-camera'; 
import ProductContext  from '../context/ProductContext';
import { useTranslation } from 'react-i18next';

const ScannerScreen = ({ navigation }) => {
  const { setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const { t } = useTranslation()

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      requestPermissions();
    }
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      setLoading(true);
      try {
        const photo = await cameraRef.current.takePictureAsync();
        const formData = new FormData();
        formData.append('file', {
          uri: photo.uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });

        // Example of making API requests
        const barcodeResponse = await axios.post(
          `${BASEURL}/upload-barcode`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const barcode = barcodeResponse.data.product_id;

        if (!barcode) {
          Alert.alert(t('Error'), t('Product not found'));
          setError(t('Product not found'));
          setLoading(false);
          return;
        }

        const productResponse = await axios.get(
          `${PRODUCT_API_URL}${barcode}?key=${API_KEY}`
        );

        const productData = productResponse.data;

        if (productData && productData.product) {
          setProducts(prev => [...prev, productData.product]);
          navigation.navigate('ProductDetails', { product: productData.product });
        } else {
          navigation.navigate('ProductNotFound');
        }
      } catch (err) {
        console.error(err);
        setError(t('An error occurred. Please try again.'));
      } finally {
        setLoading(false);
      }
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
      <CameraView
        ref={cameraRef}
        style={styles.cameraView}
        onBarCodeScanned={({ data }) => handleCapture(data)}
        facing="back"
      >
        {loading && <ActivityIndicator size="large" color="#fff" />}
        {error && (
          <View style={styles.overlay}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              onPress={() => setError(null)}
              style={styles.retryButton}
            >
              <Text style={styles.retryButtonText}>{t('Try Again')}</Text>
            </TouchableOpacity>
          </View>
        )}
        {!loading && !error && (
          <View style={styles.scanPrompt}>
            <Text style={styles.scanText}>{t('Place the barcode inside the frame')}</Text>
            <TouchableOpacity onPress={handleCapture} style={styles.captureButton}>
              <Text style={styles.captureButtonText}>{t('Capture Barcode')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  captureButton: {
    backgroundColor: '#00ff00',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ScannerScreen;
