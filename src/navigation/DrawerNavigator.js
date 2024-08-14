import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';
import MainScreen from '../screens/MainScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProductNotFoundScreen from '../screens/ProductNotFoundScreen';
import SettingsScreen from '../screens/Settings';
import AccountScreen from '../screens/Accounts';
import { useTheme } from '../context/ThemeContext';


const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator() {
  const { theme } = useTheme()
  return (
    <Drawer.Navigator
      initialRouteName="MainScreen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
          width: 240,
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="MainScreen" component={MainScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Drawer.Screen name='ProductNotFound' component={ProductNotFoundScreen} />
      <Drawer.Screen name='Profile' component={AccountScreen} />
      {/* Add more drawer items here */}
    </Drawer.Navigator>
  );
}

