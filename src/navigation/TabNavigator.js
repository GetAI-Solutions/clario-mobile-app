import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NoProductHistoryScreen from '../screens/NoProductHistoryScreen';
import HomePage from '../screens/HomeScreen';
import ScannerScreen from '../screens/ScannerScreen';
import Chatbot from '../screens/Chatbot';
import UploadScreen from '../screens/UploadScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import SettingsScreen from '../screens/Settings';
import CustomTabBarButton from '../components/CustomTabBarButton';
import { useNavigation } from '@react-navigation/native';




const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [showButtons, setShowButtons] = useState(false);
  const navigation = useNavigation();

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

/*** within the view the tab bar and a middle button are returned
 *   middle button is a touchable opacity which pops up the scan and
 *   upload buttons which are also touchable opacities as well.
 ***/

  return (
    <View style={styles.container}>
        <Tab.Navigator
          initialRouteName="ScannerScreen"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size, color}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'History') {
                iconName = focused ? 'time' : 'time-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#DAA163',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: {
              position: 'absolute',
              backgroundColor: 'transparent',
              border: 'none',
              zIndex: 10,
            },
            tabBarIconStyle: {
            },
            tabBarLabelStyle: {
              fontWeight: 700,
              fontSize: '1em',
              marginBottom: 5,
            },
            tabBarItemStyle: {
              margin: 0,
            }
          })}
          >
          <Tab.Screen
            name="Home"
            component={HomePage}
            options={{ headerShown: false }}
            />
          <Tab.Screen
            name="History"
            component={NoProductHistoryScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false }}
            />
          <Tab.Screen
            name="Profile"
            component={AccountSettingsScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>


      <View style={styles.middleButtonContainer}>
        <TouchableOpacity
          style={styles.middleButton}
          onPress={toggleButtons}
          >
          <Ionicons name="add-circle" size={'18vw'} color="#15718e" />
        </TouchableOpacity>
      </View>

      {showButtons && (
        <View style={styles.popupButtons}>
          <TouchableOpacity style={styles.popupButton} onPress={() => console.log('Upload Pressed')}>
            <Ionicons name="cloud-upload" size={30} color="white" />
            <Text style={styles.popupText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.popupButton} onPress={() => console.log('Scan Pressed')}>
            <Ionicons name="scan" size={30} color="white" />
            <Text style={styles.popupText}>Scan</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.drawerButton} onPress={openDrawer}>
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    zIndex: 2,
  },
  middleButtonContainer: {
    position: 'absolute',
    bottom: 25,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  
  middleButton: {
    width: '18vw',
  },

  popupButtons: {
    position: 'absolute',
    bottom: 120, // Adjust to position the buttons above the tab bar 
    left: '50%',
    transform: [{ translateX: -100 }], // Center the buttons horizontally based on their width
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200, // Adjust based on the combined width of your buttons
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#daa163', // Optional: background color to enhance visibility
    borderRadius: 10, // Optional: rounded corners for the popup
    elevation: 5, // Optional: shadow effect for better appearance
    // border: '1px, solid #daa163',
    zIndex: 2,
  },
  popupButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  popupText: {
    fontWeight: '700',
    color: 'white',
  }
  ,
  drawerButton: {
    position: 'absolute',
    top: 10, // Adjust to position the button at the top
    right: 10, // Adjust to position the button on the right
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    elevation: 5, // Optional: shadow effect for better appearance
  },
});

export default TabNavigator;
