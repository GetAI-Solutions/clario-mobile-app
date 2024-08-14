import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';

const Header = ({ navigation }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: theme === 'dark' ? '#fff' : '#000',
      paddingBottom: 8,
      marginBottom: 16,
      marginTop: 25,
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#F0F0F0',
    },
  });

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color={theme === 'dark' ? '#fff' : '#000'} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;