import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { ProductContext } from '../../context/ProductContext';

const ScannerScreen = ({ navigation }) => {
  const { setProducts } = useContext(ProductContext);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setLoading(true);
    setScanned(true);
    
    // Simulate API call to check if barcode exists
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
      <Camera
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        type={Camera.Constants.Type.back}
      >
        {loading && <ActivityIndicator size="large" color="#fff" />}
        {scanned && !loading && (
          <View style={styles.overlay}>
            {error ? (
              <>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={() => { setScanned(false); setError(null); }} style={styles.retryButton}>
                  <Text style={styles.retryButtonText}>Try another barcode</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('Chatbot')} style={styles.chatbotButton}>
                <Text style={styles.chatbotButtonText}>Proceed to Chatbot</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default ScannerScreen;