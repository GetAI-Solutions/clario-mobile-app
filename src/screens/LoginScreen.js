import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CountryPicker } from 'react-native-country-codes-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const Login = () => {
  const [isPhoneLogin, setIsPhoneLogin] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ dial_code: '+251', name: 'Ethiopia' });

  const navigation = useNavigation();

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    // Assuming login is successful
    navigation.navigate('MainScreen');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.head}>
        <Text style={styles.title}>Log in to your account</Text>
        <Text style={styles.subtitle}>Enter your number or email with password</Text>
      </View>

      {isPhoneLogin ? (
        <View style={styles.inputContainer}>
          <Text style={styles.label} htmlFor="phoneNumber">Phone</Text>
          <View style={styles.phoneInputContainer}>
            <TouchableOpacity
              onPress={() => setShowCountryPicker(true)}
              style={styles.countryPickerButton}
            >
              <Text>{selectedCountry.dial_code}</Text>
            </TouchableOpacity>
            <TextInput
              id="phoneNumber"
              style={styles.phoneInput}
              placeholder="Mobile Number"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <Text style={styles.label} htmlFor="email">Email</Text>
          <TextInput
            id="email"
            style={styles.input}
            placeholder="name@example.com"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label} htmlFor="password">Password</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            id="password"
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
            <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword}>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsPhoneLogin(!isPhoneLogin)} style={styles.switchLoginMethod}>
          <Text style={styles.linkText}>{isPhoneLogin ? "Use email instead" : "Use phone instead"}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        style={[
          styles.loginButton,
          ((!phoneNumber || !password) && isPhoneLogin) && styles.disabledButton,
          ((!email || !password) && !isPhoneLogin) && styles.disabledButton
        ]}
        disabled={(isPhoneLogin && (!phoneNumber || !password)) || (!isPhoneLogin && (!email || !password))}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <CountryPicker
        show={showCountryPicker}
        pickerButtonOnPress={(country) => {
          setSelectedCountry({ dial_code: country.dial_code, name: country.name.en });
          setShowCountryPicker(false);
        }}
        style={{ modal: { height: '80%' } }} // Adjust the modal height
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 8,
    marginBottom: 16,
  },
  head: {
    textAlign: 'left'
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'left',
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'left',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  countryPickerButton: {
    paddingRight: 10,
  },
  callingCode: {
    paddingRight: 10,
    fontSize: 14,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
  },
  toggleButton: {
    padding: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  forgotPassword: {
    padding: 8,
  },
  switchLoginMethod: {
    padding: 8,
  },
  linkText: {
    color: '#14B8A6',
  },
  loginButton: {
    backgroundColor: '#3299a8',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#A1A1AA',
  },
});

export default Login;
