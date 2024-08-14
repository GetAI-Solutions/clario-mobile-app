import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, Text, SafeAreaView } from 'react-native';
import Footer from '../components/Footer';
import NoProductHistory from './NoProductHistoryScreen';
import ProductList from './ProductList';
import DrawerButton from '../components/DrawerButton';
import ProductContext from '../context/ProductContext';
import { useTranslation } from 'react-i18next';

const MainScreen = ({ navigation }) => {
  const { products, loading } = useContext(ProductContext);
  const { t } = useTranslation()

  useEffect(() => {
    console.log("Products in MainScreen:", products); 
  }, [products]);

  const handleUpload = () => {
    navigation.navigate('UploadScreen');
  };

  const handleScan = () => {
    navigation.navigate('ScannerScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <DrawerButton navigation={navigation} />
      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : products.length === 0 ? (
        <NoProductHistory onUpload={handleUpload} onScan={handleScan} />
      ) : (
        <>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
            <Image source={require('../../assets/images/Frame.png')} style={styles.logo} />
          </View>
            <Text style={styles.title}>{t('Scanned Products') || 'Scanned Products'}</Text>
          <ProductList navigation={navigation} />
        </>
      )}
      {/* Footer */}
      <Footer onUpload={handleUpload} onScan={handleScan} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    paddingLeft: 15,
  },
});

export default MainScreen;
