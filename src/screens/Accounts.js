import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import UserContext from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { updateUser } from '../services/apiService';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

const AccountSecurityScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  // Ensure default values if user is null/undefined
  const [fullName, setFullName] = useState(user?.user_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || 'https://via.placeholder.com/100x100.png');
  const [loading, setLoading] = useState(false);
  
  const user_id = user?.uid;

  const initialDetails = {
    fullName: user?.user_name || '',
    email: user?.email || '',
    phoneNumber: user?.phone_no || '',
  };

  const handleSaveChanges = async () => {
    if (!fullName && !email && !phoneNumber) {
      Alert.alert('Error', 'All fields are empty. Please fill in your details.');
      return;
    }

    if (
      fullName === initialDetails.fullName &&
      email === initialDetails.email &&
      phoneNumber === initialDetails.phoneNumber
    ) {
      Alert.alert('Notice', 'No changes detected.');
      return;
    }

    setLoading(true);
    const preferences = {
      user_id: user_id,
      email: email,
      user_name: fullName,
      phone_no: phoneNumber,
      profileImage: profileImage,
    };

    try {
      console.log('Data...', preferences);
      const response = await updateUser(preferences);
      if (response.status === 200 || response.status === 204) {
        setUser({ ...user, ...preferences });
        Alert.alert('Success', 'Changes saved successfully.');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      Alert.alert('Error', 'Failed to save changes.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageChange = async () => {
    console.log('handleProfileImageChange called');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      ...(Platform.OS === 'web' ? { aspect: [4, 3] } : {}),
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
      setUser({ ...user, profileImage: imageUri });
      console.log('Image selected:', imageUri);
    } else {
      console.log('User cancelled image picker');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    title: {
      fontSize: 25,
      fontWeight: '700',
      marginVertical: 20,
      color: theme === 'dark' ? '#FFF' : '#000',
      zIndex: 1,
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    changePictureButton: {
      marginTop: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderColor: '#15718e',
      borderWidth: 1,
      borderRadius: 20,
    },
    changePictureText: {
      color: '#15718e',
      fontSize: 14,
    },
    inputContainer: {
      marginBottom: 30,
      alignItems: 'center', // Center the contents horizontally

    },
    label: {
      fontSize: 18,
      fontWeight: "500",
      color: theme === 'dark' ? '#CCC' : '#333',
      marginBottom: 5,
      textAlign: 'left',  // Align label text to the left

    },
    inputWrapper: {
      width: '80%',  // Set a percentage width (adjust as needed)
      maxWidth: 400,  // Set a maximum width (adjust as needed)
  
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: theme === 'dark' ? '#555' : '#E0E0E0',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      backgroundColor: theme === 'dark' ? '#333' : '#FFF',
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 16,
      color: theme === 'dark' ? '#FFF' : '#333',
      paddingHorizontal: 10,  // Adds padding inside the text box

    },
    icon: {
      width: 20,
      height: 20,
      tintColor: '#15718e',
    },
    saveButton: {
      marginTop: 30,
      backgroundColor: '#15718e',
      paddingVertical: 15,
      borderRadius: 25,
      alignItems: 'center',
    },
    saveButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
    },
    texture: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
      zIndex: -1,
    },
  });

  return (
    <View style={{flex: 1,  backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFF'}}>
      <ImageBackground source={theme === 'dark' ? { uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/7o9AAAAAElFTkSuQmCC' } : require('../../assets/images/texture.png')} style={styles.texture}/>
    <View style={styles.container}>
      <Text style={styles.title}>{t('Account')}</Text>

      <View style={styles.profileContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <TouchableOpacity style={styles.changePictureButton} onPress={handleProfileImageChange}>
          <Text style={styles.changePictureText}>{t('Change Picture')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('Full Name')}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
          <Image source={require('../../assets/images/edit_icon.png')} style={styles.icon} />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('Email')}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Image source={require('../../assets/images/edit_icon.png')} style={styles.icon} />
        </View>
      </View>


      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>{t('Save Changes')}</Text>}
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default AccountSecurityScreen;
