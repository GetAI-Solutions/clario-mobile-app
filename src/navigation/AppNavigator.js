import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import HomeScreen from '../screens/HomeScreen';
import SignupPhone from '../screens/SignupScreen';
import Login from '../screens/LoginScreen';
import NoProductHistoryScreen from '../screens/NoProductHistoryScreen';
import VerifyPhone from '../screens/verifyPhone';
import AddEmail from '../screens/addEmail';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupPhone} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="NoProductHistory" component={NoProductHistoryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhone} options={{ headerShown: false }} />
      <Stack.Screen name="EmailSignup" component={AddEmail} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
