import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import SignupPhone from '../screens/SignupScreen';
import Login from '../screens/LoginScreen';
import NoProductHistoryScreen from '../screens/NoProductHistoryScreen';
import VerifyPhone from '../screens/verifyPhone';
import AddEmail from '../screens/addEmail';
import MainScreen from '../screens/MainScreen';
import ScannerScreen from '../screens/ScannerScreen';
import UploadScreen from '../screens/UploadScreen';
import Chatbot from '../screens/Chatbot';
import OnboardingScreen from '../screens/OnboardingScreen';



const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="OnboardingScreen">
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupPhone} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="NoProductHistory" component={NoProductHistoryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhone} options={{ headerShown: false }} />
      <Stack.Screen name="EmailSignup" component={AddEmail} options={{ headerShown: false }} />
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UploadScreen" component={UploadScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ScannerScreen" component={ScannerScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Chatbot" component={Chatbot} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}
