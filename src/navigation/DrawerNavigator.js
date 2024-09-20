import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { useTheme } from '../context/ThemeContext';
import RateGetAi from '../screens/mainScreens/RateGetAiScreen';
import ContactUsScreen from '../screens/mainScreens/ContactUsScreen';
import FeedbackScreen from '../screens/mainScreens/FeedbackScreen';
import ShareScreen from '../screens/mainScreens/ShareScreen';
import MainScreen from '../screens/mainScreens/MainScreen';
import ProductDetailsScreen from '../screens/mainScreens/ProductDetailsScreen';
import SettingsScreen from '../screens/mainScreens/Settings';
import AccountScreen from '../screens/mainScreens/Accounts';
import HomeScreen from '../screens/mainScreens/HomeScreen';
import FaqPage from '../screens/mainScreens/FaqPage';

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
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name='FAQ' component={FaqPage} />
    </Drawer.Navigator>
  );
}


