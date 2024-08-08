import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image, 
  Platform 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import axios from 'axios'; 
import { BASEURL, PRODUCT_API_URL } from '../services/api';
import Header from '../components/Header';

const UploadScreen = ({ navigation, route }) => {
  const { setProducts } = route.params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [statusMessage, setStatusMessage] = useState(''); // State for status messages

  

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

    const API_KEY = 'key'

    if (!result.canceled) {
      setLoading(true);
      setError(null);
      setStatusMessage('Extracting barcode...'); // Set message when extraction starts

      try {
        const formData = new FormData();
        const fetchImageFromUri = async (uri) => {
          const response = await fetch(uri);
          const blob = await response.blob();
          return blob;
        };

        formData.append('file', await fetchImageFromUri(result.assets[0].uri));

        formData.append('id', '1234'); 

        console.log(formData.values());
        console.log(formData.entries());

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

        if(!barcode) {
          setLoading(true)
          navigate('ProductNotFound')
        }

        setStatusMessage('Barcode detected! Retrieving product details...'); // Set message after barcode detection

        const productResponse = await axios.get(
          `${PRODUCT_API_URL}${barcode}?key=${API_KEY}`
        );

        const productData = productResponse.data;

        if (productData && productData.product) {
          setProduct(productData.product);
          setProducts((prev) => [...prev, productData.product]);

          // Send a notification
          sendNotification('Product uploaded successfully!');

          // Navigate to Product Details Screen
          navigation.navigate('ProductDetails', { product: productData.product });
        } else {
          // Navigate to Product Not Found Screen
          navigation.navigate('ProductNotFound');
        }
      } catch (err) {
        // Handle different error responses
        console.error(err); // Log the error for debugging
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
      } finally {
        setLoading(false);
        setStatusMessage(''); // Clear status message once loading is complete
      }
    }
  };

  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Platform.OS === 'ios') {
      await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      });
    }
  };

  const sendNotification = async (message) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Product Upload',
        body: message,
        data: { data: 'goes here' },
      },
      trigger: { seconds: 1 },
    });
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        {!product && !loading && !error && (
          <TouchableOpacity onPress={handleImagePick} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Image</Text>
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
