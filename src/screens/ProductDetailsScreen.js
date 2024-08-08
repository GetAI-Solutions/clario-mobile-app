import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription = product.description.length > 150
    ? product.description.slice(0, 150) + '...'
    : product.description;

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.hamburgerButton}>
          <Icon name="menu" size={28} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>
          {showFullDescription ? product.description : truncatedDescription}
        </Text>
        {product.description.length > 150 && (
          <TouchableOpacity onPress={toggleDescription}>
            <Text style={styles.readMoreText}>
              {showFullDescription ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('Chatbot', { product })}
          style={styles.chatbotButton}
        >
          <Text style={styles.chatbotButtonText}>Find More Details in Chatbot</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  hamburgerButton: {
    marginRight: 20,
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  readMoreText: {
    fontSize: 16,
    color: '#319795',
    marginBottom: 20,
    textAlign: 'center',
  },
  chatbotButton: {
    backgroundColor: '#319795',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  chatbotButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default ProductDetailsScreen;