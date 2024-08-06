import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, Text, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer';
import NoProductHistory from './NoProductHistoryScreen';
import ProductList from './ProductList';
import Icon from 'react-native-vector-icons/Ionicons';

const MainScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    navigation.navigate('UploadScreen', { setProducts });
  };

  const handleScan = () => {
    navigation.navigate('ScannerScreen', { setProducts });
  };

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.hamburgerButton}>
          <Icon name="menu" size={28} color="#000" />
        </TouchableOpacity>
      </View>

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
