import React, { useState, useEffect }from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import MainDrawerNavigator from './DrawerNavigator'; 
import SettingsScreen from '../screens/Settings';
import AccountScreen from '../screens/Accounts';
import HomeScreen from '../screens/HomeScreen';
import { useTheme } from '../context/ThemeContext'; 
import { useTranslation } from 'react-i18next';
import { Keyboard, View } from 'react-native';
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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
            iconName = focused ? 'barcode' : 'barcode-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#daa163',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: [
          {
            border: 'none',
            backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
            paddingBottom: 10,
            height: 70,
          },
          keyboardVisible ? { display: 'none' } : {}, 
        ],
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '700',
        },
        tabBarBackground: () => (
          <View style={{ backgroundColor: '#15718e', width: '100%', height: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}></View>
        ),
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: t('Home') }}
      />
      <Tab.Screen
        name="MainTabScreen"
        component={MainDrawerNavigator}
        options={{ tabBarLabel: t('Scanned') }}
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


