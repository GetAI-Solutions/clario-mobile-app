import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, Text, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer';
import NoProductHistory from './NoProductHistoryScreen';
import ProductList from './ProductList';
import Icon from 'react-native-vector-icons/Ionicons';
import DrawerButton from '../components/DrawerButton';

const MainScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    navigation.navigate('UploadScreen', { setProducts });
  };

  const handleScan = () => {
    navigation.navigate('ScannerScreen', { setProducts });
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <DrawerButton navigation={navigation} />
      {/* Content */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {products.length === 0 ? (
        <NoProductHistory onUpload={handleUpload} onScan={handleScan} />
      ) : (
        <>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
            <Image source={require('../../assets/images/Frame.png')} style={styles.logo} />
          </View>
          <Text style={styles.title}>Scanned Products</Text>
          <ProductList products={products} setProducts={setProducts} navigation={navigation} />
        </>
      )}

      {/* Footer */}
      <Footer onUpload={handleUpload} onScan={handleScan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  hamburgerButton: {
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 8,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default MainScreen;
