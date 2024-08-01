import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, Text } from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NoProductHistory from './NoProductHistoryScreen';
import ProductList from './ProductList';

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
      <Header navigation={navigation} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {products.length === 0 ? (
        <NoProductHistory onUpload={handleUpload} onScan={handleScan} />
      ) : (
        <>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
            <Image source={require('../../assets/images/Frame.png')} style={styles.logo} />
          </View>
          <Text style={styles.title} >Scanned Products</Text>
          <ProductList products={products} setProducts={setProducts} navigation={navigation} />
        </>
      )}
      <Footer onUpload={handleUpload} onScan={handleScan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 8,
  },
});

export default MainScreen;
