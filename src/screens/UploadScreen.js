import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, ImageBackground, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadBarcode, getProductSummary } from '../services/apiService';
import { fetchImageFromUri } from '../utils/imageUtils';
import { registerForPushNotificationsAsync, sendNotification } from '../utils/notificationUtils';
import { Platform } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import Header from '../components/Header';
import ProductContext from '../context/ProductContext';
import UserContext from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const UploadScreen = ({ navigation }) => {
  const { setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const { user, updateUser } = useContext(UserContext);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { width } = Dimensions.get("window");

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const handleImagePick = async () => {
    console.log('handleImagePick called');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      ...(Platform.OS === 'web' ? { aspect: [4, 3] } : {}), 
    });
  
    console.log('ImagePicker result:', result);
  
    let bar_code = ''; // Declare bar_code here
    if (!result.canceled) {
      try {
        setLoading(true);
        setError(null);
        setStatusMessage(t('Extracting barcode...'));
  
        let formData = new FormData();
  
        if (Platform.OS === 'web') {
          const imageBlob = await fetchImageFromUri(result.assets[0].uri);
          formData.append('file', imageBlob);
        } else {
          setStatusMessage(t('Resizing image...'));
          const manipResult = await ImageManipulator.manipulateAsync(
            result.assets[0].uri,
            [{ resize: { width: 800, height: 600 } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
          );
          console.log('Resized image:', manipResult.uri);
          formData.append('file', {
            uri: manipResult.uri,
            name: 'image.jpg',
            type: 'image/jpeg',
          });
        }
  
        formData.append('id', user.uid);
        console.log('formData:', formData);
  
        const barcodeData = await uploadBarcode(formData);
        bar_code = barcodeData.product_barcode; // Assign value to the existing variable
        console.log("barcode...", bar_code);
  
        if (bar_code && bar_code !== '') {
          setStatusMessage(t('Barcode detected! Retrieving product details...'));
          const productData = await getProductSummary(bar_code, user.uid);
          console.log('barcode...', bar_code)
          console.log('response object...', productData)
          if (productData && productData.product) {
            const product = productData.product;
            setProduct(product);  
            setProducts((prev) => [...prev, product]);
            console.log('navigating with product...', product)
            sendNotification(t('Product uploaded successfully!'));
            navigation.navigate('ProductDetails', { product });
          } else {
            console.log('barcode...', bar_code)
            navigation.navigate('ProductNotFound', { bar_code: bar_code });
          }
        } else {
          setError(t('No barcode detected.'));
        }
  
      } catch (err) {
        console.error('Upload error:', err);
        handleError(err, bar_code); // Pass the barcode variable here
      } finally {
        setLoading(false);
        setStatusMessage('');
      }
    }
  };
  

const handleError = ( err, bar_code ) => {
  console.error('Error details:', { err });

  if (err.response) {
    switch (err.response.status) {
      case 400:
        console.log('barcode...', bar_code)
        navigation.navigate('ProductNotFound', { bar_code: bar_code });
        break;
      case 401:
        setError(t('Unauthorized access.'));
        break;
      case 403:
        setError(t('Forbidden access.'));
        break;
      case 404:
        console.log('barcode...', bar_code)
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#F0F0F0',
      paddingHorizontal: 20,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -150,
      zIndex: -1,
    },
    uploadButton: {
      backgroundColor: theme === 'light' ? '#15718e' : '#daa163',
      padding: 12,
      width: '70%',
      borderRadius: 50,
    },
    uploadButtonText: {
      color: '#FFF',
      fontSize: '1.2em',
      fontWeight: 700,
      alignSelf: 'center',
    },
    loadingContainer: {
      alignItems: 'center',
      width: '100%',
    },
    statusText: {
      color: theme === 'dark' ? '#FFF' : '#333',
      marginTop: 10,
    },
    errorContainer: {
      alignItems: 'center',
      marginTop: 20,
      width: '100%'
    },
    errorText: {
      color: '#FF0000',
      marginBottom: 20,
      fontSize: 18,
    },
    retryButton: {
      backgroundColor: '#FF0000',
      padding: 12,
      width: '70%',
      borderRadius: 50,
    },
    retryButtonText: {
      color: '#FFF',
      fontSize: '1.2em',
      fontWeight: 700,
      alignSelf: 'center',
    },
    art: {
      width: width * 0.8,
      height: width * 0.8,
      resizeMode: 'contain',
    },
    imgContainer: {
      display: 'flex',
      justifyContent: 'center',
      width: '80%',
      alignSelf: 'center',
    },
    description: {
      textAlign: 'center',
      width: '85%',
      color: theme === 'light' ? '#000' : '#fff',
      fontSize: '1.2em',
      fontWeight: '600',
      alignSelf: 'center',
      marginTop: -30,
      marginBottom: 30,
    },
    texture: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
      zIndex: -1,
    }
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}/>
      <Header navigation={navigation}/>
      <View style={styles.content}>
      <View style={styles.imgContainer}>
        <Image source={require('../../assets/images/uploadArt.png')} style={styles.art}/>
        <Text style={styles.description}>Upload an image with your barcode. and we'll do the rest</Text>
      </View>
        {!product && !loading && !error && (
          <TouchableOpacity onPress={handleImagePick} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>{t('Upload Image')}</Text>
          </TouchableOpacity>
        )}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme === 'light' ? '#15718e' : '#daa163'} />
            <Text style={styles.statusText}>{statusMessage}</Text>
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

export default UploadScreen;