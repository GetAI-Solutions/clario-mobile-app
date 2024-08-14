import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageContext } from '../context/LanguageContext';

const ProductNotFoundScreen = ({ navigation }) => {
  const [productName, setProductName] = useState('');
  const { translations } = useContext(LanguageContext)

  const handleSearch = () => {
    console.log('Searching for:', productName);
  };

  const handleUpload = () => {
    navigation.navigate('UploadScreen')
  }

  const handleScan = () => {
    navigation.navigate('ScannerScreen')
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/placard.png')} style={styles.placardImage} />
          <Image source={require('../../assets/images/person.png')} style={styles.personImage} />
        </View>
        <Text style={styles.messageText}>{translations['We Couldn\'t Find Your Product']}</Text>
        <Text style={styles.suggestionText}>
          {translations['We might not have your product yet, try searching by name.']}
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={translations['Enter name of product']}

            value={productName}
            onChangeText={setProductName}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Image source={require('../../assets/images/search.png')} />
          </TouchableOpacity>
        </View>

        <Footer onUpload={handleUpload} onScan={handleScan} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  placardImage: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  personImage: {
    width: 150,
    height: 150,
  },
  messageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  suggestionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#319795',
    borderRadius: 25,
    paddingHorizontal: 10,
    width: '90%',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  searchButton: {
    padding: 10,
  },
  searchButtonText: {
    fontSize: 20,
  },
  optionButton: {
    backgroundColor: '#319795',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    width: 100,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProductNotFoundScreen;