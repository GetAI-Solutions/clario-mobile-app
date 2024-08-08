import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Header from '../components/Header';

const ProductNotFoundScreen = ({ navigation }) => {
  const [askForName, setAskForName] = useState(false);
  const [productName, setProductName] = useState('');

  const handleYesPress = () => {
    setAskForName(true);
  };

  const handleSearch = () => {
    // Navigate to a chatbot or perform a search with the product name
    // Example: navigation.navigate('Chatbot', { productName });
    console.log('Searching for:', productName);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.messageText}>We couldn't find the product you're looking for.</Text>
        <Text style={styles.suggestionText}>Would you like to use other means to get product information?</Text>
        
        {!askForName ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleYesPress} style={styles.optionButton}>
              <Text style={styles.optionButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.optionButton}>
              <Text style={styles.optionButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter product name"
              value={productName}
              onChangeText={setProductName}
            />
            <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Search</Text>
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
    padding: 20,
  },
  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: 10,
    textAlign: 'center',
  },
  suggestionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#319795',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#319795',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProductNotFoundScreen;