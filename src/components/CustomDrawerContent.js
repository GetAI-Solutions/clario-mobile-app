
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomDrawerContent = (props) => {
  const { navigation } = props;

  const handleLogout = () => {
    // Implement logout logic here
    navigation.navigate('Login'); // Navigate to login screen
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
        <Text style={styles.name}>John Doe</Text>
      </View>
      <DrawerItem
        label="Home"
        icon={({ focused, color, size }) => (
          <Icon name={focused ? 'home' : 'home-outline'} size={size} color={color} />
        )}
        onPress={() => navigation.navigate('MainScreen')}
      />
      <DrawerItem
        label="Profile"
        icon={({ focused, color, size }) => (
          <Icon name={focused ? 'person' : 'person-outline'} size={size} color={color} />
        )}
        onPress={() => navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Settings"
        icon={({ focused, color, size }) => (
          <Icon name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />
        )}
        onPress={() => navigation.navigate('Settings')}
      />
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f44',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
