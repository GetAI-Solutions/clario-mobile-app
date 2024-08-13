import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Header from '../components/Header'; 
import UserContext from '../context/UserContext';

const AccountSecurityScreen = ({ navigation }) => {
    const { user, setUser } = useContext(UserContext)

  const [fullName, setFullName] = useState(user.user_name);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_no);

  const handleSaveChanges = () => {
    console.log('Changes saved:', { fullName, email, phoneNumber });
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <Text style={styles.title}>Account & Security</Text>

      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/100x100.png' }} 
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.changePictureButton}>
          <Text style={styles.changePictureText}>Change Picture</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={user.user_name}
            onChangeText={setFullName}
          />
          <Image 
            source={require('../../assets/images/edit_icon.png')} // Placeholder for edit icon
            style={styles.icon}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={user.email}
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
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={user.phone_no}
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
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
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
    color: '#333',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
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
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AccountSecurityScreen;
