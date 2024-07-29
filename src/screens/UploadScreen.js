import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';

const UploadScreen = ({ navigation, route }) => {
  const { setProducts } = route.params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);

      // Simulate API call to check if barcode exists
      setTimeout(() => {
        setLoading(false);
        const data = 'uploaded-barcode'; // Simulated barcode from image
        if (data === 'valid-barcode') {
          setProducts(prev => [...prev, { name: 'Product Name', barcode: data }]);
          navigation.navigate('Chatbot', { product: { name: 'Product Name', barcode: data } });
        } else {
          setError('Product not found');
        }
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <TouchableOpacity onPress={handleImagePick} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && !loading && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={handleImagePick} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Try another image</Text>
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