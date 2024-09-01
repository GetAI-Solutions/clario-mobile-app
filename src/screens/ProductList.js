import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,ImageBackground, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ProductContext from '../context/ProductContext';
import { useTheme } from '../context/ThemeContext';

const ProductList = ({ navigation }) => {
  const { products, deleteProduct } = useContext(ProductContext);
  const { theme } = useTheme();

  console.log("Products in ProductList:", products);

  const handleChatbot = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const handleDelete = (index) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteProduct(index),
        },
      ]
    );
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => handleChatbot(item)}>
      <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
        {item.product_name}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleDelete(index)}>
          <Image
            source={require('../../assets/images/delete.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    list: {
      paddingHorizontal: 16,
      marginBottom: 64,
    },
    productContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 14,
      paddingVertical: 30,
      borderRadius: 20,
      backgroundColor: theme === 'dark' ? '#daa163' : '#15718e',
      marginTop: 16,
    },
    productName: {
      fontSize: '1.2em',
      fontWeight: 600,
      color: '#fff',
      marginLeft: 30,
    },
    actions: {
      flexDirection: 'row',
    },
    icon: {
      width: 28,
      height: 28,
      marginLeft: 16,
    },
  });

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
    />
  );
};

export default ProductList;