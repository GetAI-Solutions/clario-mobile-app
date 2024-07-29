import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

const Footer = ({ onUpload, onScan }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={onUpload} style={styles.button}>
        <View style={styles.iconWrapper}>
          <Image source={require('../../assets/images/upload.png')} style={styles.icon} />
        </View>
        <Text style={styles.label}>Upload</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onScan} style={styles.button}>
        <View style={styles.iconWrapper}>
          <Image source={require('../../assets/images/scan.png')} style={styles.icon} />
        </View>
        <Text style={styles.label}>Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'center', // Center the buttons horizontally
        padding: 16,
        paddingBottom: 32, // Move the buttons upwards by increasing the bottom padding
        backgroundColor: '#f3f4f6',
      },
      button: {
        alignItems: 'center',
        marginHorizontal: 20, // Adjust this value to control the spacing between the buttons
      },
      iconWrapper: {
        backgroundColor: '#319795', // Background color for the circle
        borderRadius: 50, // Making the background a circle
        padding: 10,
        marginBottom: 8,
      },
      icon: {
        width: 30,
        height: 30,
        tintColor: 'white', // Ensuring the icon is visible on the background
      },
      label: {
        fontSize: 14,
        color: '#000',
      },
});

export default Footer;