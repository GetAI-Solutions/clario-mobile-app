import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const SearchBar = ({ onSearch, isLoading, reset }) => {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');

  // Clear the query when `reset` changes to true
  useEffect(() => {
    if (reset) {
      setQuery('');
    }
  }, [reset]);

  const handleSearchClick = () => {
    if (!query.trim()) {
      Alert.alert('Please enter a product name');
    } else {
      onSearch(query.trim());
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.9)',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.1)',
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '100%',
      maxWidth: 300, // Adjusted width to fit better
      alignSelf: 'center',
    },
    input: {
      flex: 1,
      height: 35,
      paddingHorizontal: 10,
      borderRadius: 20,
      fontSize: 14,
      backgroundColor: 'transparent',
      color: theme === 'dark' ? '#fff' : '#333',
    },
    icon: {
      width: 20,
      height: 20,
      tintColor: theme === 'dark' ? '#fff' : '#333',
    },
    sendButton: {
      backgroundColor: theme === 'dark' ? '#444' : '#15718e',
      padding: 6,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loading: {
      marginLeft: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/search.png')} style={styles.icon} />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search products name..."
        placeholderTextColor={theme === 'dark' ? '#ccc' : '#888'}
        style={styles.input}
      />
      {isLoading ? (
        <ActivityIndicator size="small" color={theme === 'dark' ? '#fff' : '#15718e'} style={styles.loading} />
      ) : (
        <TouchableOpacity onPress={handleSearchClick} style={styles.sendButton}>
          <Image source={require('../../assets/images/send.png')} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
