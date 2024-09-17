import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const SearchBar = ({ onSearch }) => {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');

  const handleSearchClick = () => {
    if (!query.trim()) {
      Alert.alert('Please enter a product name');
    } else {
      onSearch(query.trim()); // Call the passed function with the query
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      opacity: 0.9,
    },
    input: {
      flex: 1,
      height: 40,
      paddingHorizontal: 10,
    },
    icon: {
      width: 20,
      height: 20,
      marginHorizontal: 10,
    },
    sendButton: {
      backgroundColor: theme === 'dark' ? '#444' : '#15718e',
      padding: 10,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/search.png')} style={styles.icon} />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search products..."
        placeholderTextColor={theme === 'dark' ? '#ccc' : '#888'}
        style={[
          styles.input,
          { backgroundColor: theme === 'dark' ? '#333' : '#f2f2f2', color: theme === 'dark' ? '#fff' : '#333' },
        ]}
      />
      <TouchableOpacity onPress={handleSearchClick} style={styles.sendButton}>
        <Image source={require('../../assets/images/send.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;