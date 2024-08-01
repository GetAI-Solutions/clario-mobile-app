import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import * as Notifications from 'expo-notifications';

const UploadScreen = ({ navigation, route }) => {
  const { setProducts } = route.params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

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

    if (!result.canceled) {
      setLoading(true);

      // Simulate API call to add product
      setTimeout(() => {
        setLoading(false);
        const productData = { name: 'Product Name', image: result.assets[0].uri };
        setProducts(prev => [...prev, productData]);
        setProduct(productData);

        // Send a notification
        sendNotification('Product uploaded successfully!');
      }, 2000);
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
      {!product && (
          <TouchableOpacity onPress={handleImagePick} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>
        )}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && !loading && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={handleImagePick} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Try another image</Text>
            </TouchableOpacity>
          </View>
        )}
        {product && (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>Product uploaded successfully!</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Chatbot', { product })}
              style={styles.chatbotButton}
            >
              <Text style={styles.chatbotButtonText}>Go to Chatbot</Text>
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
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#008000', // green color
    marginBottom: 10,
  },
  chatbotButton: {
    backgroundColor: '#4CAF50', // green color
    padding: 10,
    borderRadius: 5,
  },
  chatbotButtonText: {
    fontSize: 16,
    color: '#FFFFFF', // white color
    textAlign: 'center',
  },
});

export default UploadScreen;