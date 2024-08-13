import React from 'react';
import { View, Text, Switch, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Header from '../components/Header'; 

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.option}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/bell.png')} style={styles.icon} />
          <Text style={styles.optionText}>Notifications</Text>
        </View>
        <Switch />
      </View>

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/lock.png')} style={styles.icon} />
          <Text style={styles.optionText}>Account & Security</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/languages.png')} style={styles.icon} />
          <Text style={styles.optionText}>Languages</Text>
        </View>
        <Image source={require('../../assets/images/dropdown.png')} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/mode.png')} style={styles.icon} />
          <Text style={styles.optionText}>Dark Mode</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/share.png')} style={styles.icon} />
          <Text style={styles.optionText}>Share App</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/star.png')} style={styles.icon} />
          <Text style={styles.optionText}>Rate GetAI</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionLeft}>
          <Image source={require('../../assets/images/analyze.png')} style={styles.icon} />
          <Text style={styles.optionText}>Terms and Conditions</Text>
        </View>
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default SettingsScreen;
