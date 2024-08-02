import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { ProductContext } from '../context/ProductContext';

const ScannerScreen = ({ navigation }) => {
  const { setProducts } = useContext(ProductContext);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      params: () => {
        return {
          setProducts: () => setProducts,
        };
      },
    });
  }, [navigation, setProducts]);

  const handleBarCodeScanned = ({ type, data }) => {
    setLoading(true);
    setScanned(true);

    // Simulate API call to accept any barcode
    setTimeout(() => {
      setLoading(false);
      setProducts(prev => [...prev, { name: 'Product Name', barcode: data }]);
      navigation.navigate('Chatbot', { product: { name: 'Product Name', barcode: data } });
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
        ref={cameraRef}
        style={styles.cameraView}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        type={Camera.Constants.Type.back}
      >
        {loading && <ActivityIndicator size="large" color="#fff" />}
        <View style={styles.focusContainer}>
          <View style={styles.focusBox}>
            <View style={styles.focusCornerTopLeft} />
            <View style={styles.focusCornerTopRight} />
            <View style={styles.focusCornerBottomLeft} />
            <View style={styles.focusCornerBottomRight} />
          </View>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>Place the barcode within the frame to scan</Text>
        </View>
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
    alignItems: 'center',
  },
  cameraView: {
    height: '50%',
    width: '80%',
    marginTop: '30%',
    alignContent: 'center',
  },
  focusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusBox: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'absolute',
  },
  focusCornerTopLeft: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 50,
    height: 50,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#00ff00',
  },
  focusCornerTopRight: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 50,
    height: 50,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#00ff00',
  },
  focusCornerBottomLeft: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#00ff00',
  },
  focusCornerBottomRight: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#00ff00',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    padding: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  instructions: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructionText: {
    color: '#fff',
    fontSize: 18,
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