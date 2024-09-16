import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, SafeAreaView, ImageBackground } from 'react-native';
import Footer from '../components/Footer';
import NoProductHistory from './NoProductHistoryScreen';
import ProductList from './ProductList';
import DrawerButton from '../components/DrawerButton';
import ProductContext from '../context/ProductContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const MainScreen = ({ navigation }) => {
  const { products, loading } = useContext(ProductContext);
  const { t } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    console.log("Products in MainScreen:", products);
  }, [products]);

  const handleUpload = () => {
    navigation.navigate('UploadScreen');
  };

  const handleScan = () => {
    navigation.navigate('ScannerScreen');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFF',
    },
    content: {
      flex: 1, 
      marginBottom: 64, 
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#fff' : '#333',
      paddingLeft: 15,
      marginVertical: 30,
    },
    texture: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}/>
        {/* Custom Header */}
        <DrawerButton navigation={navigation} />

        {/* Content */}
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : products.length === 0 ? (
            <NoProductHistory onUpload={handleUpload} onScan={handleScan} />
          ) : (
            <>
              <Text style={styles.title}>{t('Scanned Products') || 'Scanned Products'}</Text>
              <ProductList navigation={navigation} />
            </>
          )}
        </View>

        {/* Footer */}
        <Footer onUpload={handleUpload} onScan={handleScan} />
    </SafeAreaView>
  );
};

export default MainScreen;
