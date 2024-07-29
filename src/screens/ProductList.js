import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const ProductList = ({ products, setProducts, navigation }) => {
  const handleDelete = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const handleChatbot = (product) => {
    navigation.navigate('Chatbot', { product });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.name}</Text>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 16,
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
