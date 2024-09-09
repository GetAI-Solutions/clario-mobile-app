import React, { useState, useContext, useEffect  } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet, ActivityIndicator, ScrollView, Alert, Platform } from 'react-native';
import Header from '../components/Header'; 
import UserContext from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { updateUser } from '../services/apiService';
import * as ImagePicker from 'expo-image-picker';


const AccountSecurityScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false)

  console.log('user...', user)

  const [fullName, setFullName] = useState(user ? user.user_name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phone_no : '');

  const [profileImage, setProfileImage] = useState(user?.profileImage || 'https://via.placeholder.com/100x100.png');

  
  const user_id = user.uid

  const initialDetails = {
    fullName: user ? user.user_name : '',
    email: user ? user.email : '',
    phoneNumber: user ? user.phone_no : '',
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
    };

    try {
      console.log("Data...", preferences)
      const response = await updateUser(preferences);
      if (response.status === 200 || response.status === 204) {
        setUser({ ...user, ...preferences });
        Alert.alert('Success', 'Changes saved successfully.');
      }
      console.log('Changes saved:', preferences);
    } catch (error) {
      Alert.alert('Error', 'Failed to save changes.');
      console.error('Error saving changes:', error);
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
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFF',
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginVertical: 10,
      color: theme === 'dark' ? '#FFF' : '#000',
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
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      color: theme === 'dark' ? '#CCC' : '#333',
      marginBottom: 5,
    },
    inputWrapper: {
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
      marginBottom: 20,
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
    },
  });

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/texture.png')} style={styles.texture}/>
      <Header navigation={navigation} />
      <Text style={styles.title}>{t('Account & Security')}</Text>

      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: profileImage }} 
          style={styles.profileImage}
        />
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
          <Image 
            source={require('../../assets/images/edit_icon.png')} 
            style={styles.icon}
          />
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
          <Image 
            source={require('../../assets/images/edit_icon.png')} 
            style={styles.icon}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('Phone Number')}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <Image 
            source={require('../../assets/images/edit_icon.png')} 
            style={styles.icon}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>{t('Save Changes')}</Text>
        )}
      </TouchableOpacity>

    </View>
 
    
  );
};

export default AccountSecurityScreen;