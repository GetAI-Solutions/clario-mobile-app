import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { ProductContext } from '../context/ProductContext'
const ScannerScreen = ({ navigation }) => {
  const { setProducts } = useContext(ProductContext);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(CameraView);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setLoading(true);
    setScanned(true);
    setTimeout(() => {
      setLoading(false);
      if (data === 'valid-barcode') {
        setProducts(prev => [...prev, { name: 'Product Name', barcode: data }]);
        navigation.navigate('Chatbot', { product: { name: 'Product Name', barcode: data } });
      } else {
        setError('Product not found');
      }
    }, 2000);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.cameraView}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        facing="back"
      >
        {loading && <ActivityIndicator size="large" color="#fff" />}
        {scanned && !loading && (
          <View style={styles.overlay}>
            {error ? (
              <>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setScanned(false);
                    setError(null);
                  }}
                  style={styles.retryButton}
                >
                  <Text style={styles.retryButtonText}>Try another barcode</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate('Chatbot')}
                style={styles.chatbotButton}
              >
                <Text style={styles.chatbotButtonText}>Proceed to Chatbot</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {!scanned && !loading && (
          <View style={styles.scanPrompt}>
            <Text style={styles.scanText}>Place the barcode inside the frame</Text>
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
  chatbotButton: {
    backgroundColor: '#00ff00',
    padding: 10,
    borderRadius: 5,
  },
  chatbotButtonText: {
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