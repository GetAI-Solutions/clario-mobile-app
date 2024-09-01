import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { useTheme } from '../context/ThemeContext';
import RateGetAi from '../screens/RateGetAiScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import ShareScreen from '../screens/ShareScreen';
import MainScreen from '../screens/MainScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProductNotFoundScreen from '../screens/ProductNotFoundScreen';
import SettingsScreen from '../screens/Settings';
import AccountScreen from '../screens/Accounts';
import LandingScreen from '../screens/LandingScreen';
import HomeScreen from '../screens/HomeScreen';
const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator() {
  const { theme } = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="MainDrawerScreen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
          width: 240,
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="MainDrawerScreen" component={MainScreen} />
      <Drawer.Screen name="RateGetAi" component={RateGetAi} />
      <Drawer.Screen name="Feedback" component={FeedbackScreen} />
      <Drawer.Screen name="ContactUs" component={ContactUsScreen} />
      <Drawer.Screen name="Share" component={ShareScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="ProductDetails" component={ProductDetailsScreen} />
      
      <Drawer.Screen name="Profile" component={AccountScreen} />
      <Drawer.Screen name="Landing" component={LandingScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}


