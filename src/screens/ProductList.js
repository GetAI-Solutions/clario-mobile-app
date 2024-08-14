import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ProductContext from '../context/ProductContext';

const ProductList = ({ navigation }) => {
  const { products, deleteProduct } = useContext(ProductContext);

  console.log("Products in ProductList:", products);

  const handleChatbot = (product) => {
    navigation.navigate('Chatbot', { product });
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
     <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.product_name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleChatbot(item)}>
          <Image source={require('../../assets/images/chatbot.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(index)}>
          <Image source={require('../../assets/images/delete.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 16,
    color: '#2c7391'
  },
  actions: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
});

export default ProductList;
