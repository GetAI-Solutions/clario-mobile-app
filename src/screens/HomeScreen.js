import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import WideCard from '../components/WideCard';
import NarrowCard from '../components/NarrowCard';
import MediumCard from '../components/MediumCard';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { fetchHomePageProducts } from '../services/apiService';


const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('function called...')
    const getProducts = async () => {
      try {
        const productData = await fetchHomePageProducts();
        console.log('productData...', productData)
        setProducts(productData);  
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);



  const handlePress = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      padding: 20,
      paddingTop: 10,
      paddingHorizontal: 16,
      zIndex: 1,
    },
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: theme === 'light' ? 'white' : '#1e1e1e',
      height: 80,
    },
    headerText: {
      fontSize: 20,
      fontWeight: '700',
      color: theme === 'light' ? '#15718e' : '#fff',
      marginLeft: 20,
      marginTop: 20,
      zIndex: 1,
    },
    logo: {
      position: 'absolute',
      top: 15,
      left: '80%',
      width: 50,
      height: 50,
      resizeMode: 'contain',
      zIndex: 1,
      paddingTop: 70,
    },
    section: {
      marginTop: 20,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: theme === 'dark' ? '#FFF' : '#15718e',
      marginBottom: 10,
      paddingHorizontal: 5,

    },
    sponsoredTitle: {
      color:  '#daa163',
      paddingHorizontal: 5,
    },
    productsRow: {
      flexDirection: 'row',
    },
    productContainer: {
      alignItems: 'center',
      width: '48%',
      marginBottom: 20,
      paddingHorizontal: 5,

    },
    loads: {
      textAlign: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },
    texture: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
      zIndex: -1,
    },
    centered: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e', 
  },
  loads: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: theme === 'light' ? '#000' : '#fff', 
  },
  error: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red', 
  },
    
  });

    if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loads}>Loading...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }


  return (
    <ScrollView >
    <View style={styles.header}>
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}></ImageBackground>
      <Image source={require('../../assets/images/getai.png')} style={styles.logo}></Image>
      <Text style={styles.headerText}>GetAI</Text>
    </View>
    <View style={{backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e'}}>
      <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}></ImageBackground>
    <View style={styles.container}>
    {products.map((category, categoryIndex) => (
      <View key={categoryIndex} style={styles.section}>
        <Text style={[styles.sectionTitle, (category.section === 'Sponsored' || category.section === 'Latest Additions') && styles.sponsoredTitle]}>
          {t(category.section)}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsRow}>
          {category.items.map((product, index) => {
            switch (category.section) {
              case 'Popular Today':
                return (
                  <WideCard
                  key={index}
                  name={product.product_name}
                  brand={product.product_brand}
                  image={product.image_url}
                  onPress={() => handlePress(product)}
                  />
                );
                case 'African Made':
                  return (
                    <NarrowCard
                    key={index}
                    name={product.product_name}
                    brand={product.product_brand}
                    image={product.image_url}
                    onPress={() => handlePress(product)}
                    />
                  );
                  default:
                    return (
                  <MediumCard
                  key={index}
                  name={product.product_name}
                  brand={product.product_brand}
                  image={product.image_url}
                  onPress={() => handlePress(product)}
                  />
                );
            }
          })}
        </ScrollView>
      </View>
    ))}
    </View>
    </View>
  </ScrollView>
  );
};



export default HomeScreen;