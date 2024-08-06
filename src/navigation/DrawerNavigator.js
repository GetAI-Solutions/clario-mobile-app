import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import MainScreen from '../screens/MainScreen';


const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="MainScreen"
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Use custom drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 240,
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="MainScreen" component={MainScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      {/* Add more drawer items here */}
    </Drawer.Navigator>
  );
}

