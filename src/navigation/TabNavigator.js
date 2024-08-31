import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MainDrawerNavigator from './DrawerNavigator'; 
import SettingsScreen from '../screens/Settings';
import AccountScreen from '../screens/Accounts';
import HomeScreen from '../screens/HomeScreen';
import { useTheme } from '../context/ThemeContext'; 
import { useTranslation } from 'react-i18next'; 

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName="MainTabScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Accounts') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'MainTabScreen') {
            iconName = focused ? 'menu' : 'menu-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme === 'dark' ? '#FF6347' : '#FF4500',
        tabBarInactiveTintColor: theme === 'dark' ? '#B0B0B0' : '#808080',
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="MainTabScreen"
        component={MainDrawerNavigator}
        options={{ tabBarLabel: t('Main Menu') }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: t('Home') }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: t('Settings') }}
      />
      <Tab.Screen
        name="Accounts"
        component={AccountScreen}
        options={{ tabBarLabel: t('Accounts') }}
      />
    </Tab.Navigator>
  );
}

