import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({ navigation }) => {
  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      paddingBottom: 8,
      marginBottom: 16,
      marginTop: 25,
      backgroundColor: 'transparent',
    },
  });

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
