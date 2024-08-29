import React, { useState, useContext, useEffect  } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import Header from '../components/Header'; 
import UserContext from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { updateUser } from '../services/apiService';

const AccountSecurityScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false)

  console.log('user...', user)

  const [fullName, setFullName] = useState(user.user_name);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_no);
  const user_id = user.uid

  const handleSaveChanges = async () => {
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
      }
      console.log('Changes saved:', preferences);
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    console.log('User changed:', user); 
  }, [user]);
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#F0F0F0',
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
      borderColor: '#3299a8',
      borderWidth: 1,
      borderRadius: 20,
    },
    changePictureText: {
      color: '#3299a8',
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
      tintColor: '#3299a8',
    },
    saveButton: {
      marginTop: 30,
      backgroundColor: '#3299a8',
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
  });

  return (
    <ScrollView>
      <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.title}>{t('Account & Security')}</Text>

      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/100x100.png' }} 
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.changePictureButton}>
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
    </ScrollView>
    
  );
};

export default AccountSecurityScreen;