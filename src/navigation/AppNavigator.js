import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import NoProductHistoryScreen from '../screens/NoProductHistoryScreen';
import VerifyPhone from '../screens/verifyPhone';
import AddEmail from '../screens/addEmail';
import ScannerScreen from '../screens/ScannerScreen';
import UploadScreen from '../screens/UploadScreen';
import Chatbot from '../screens/Chatbot';
import OnboardingScreen from '../screens/OnboardingScreen';
import MainDrawerNavigator from './DrawerNavigator';
import UserContext from '../context/UserContext';
import FeedbackScreen from '../screens/FeedbackScreen';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Stack.Navigator initialRouteName="OnboardingScreen">
      {!user ? (
        <>
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EmailSignup" component={AddEmail} options={{ headerShown: false }} />
          <Stack.Screen name="VerifyEmail" component={VerifyPhone} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainScreen" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="NoProductHistory" component={NoProductHistoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="UploadScreen" component={UploadScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ScannerScreen" component={ScannerScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Chatbot" component={Chatbot} options={{ headerShown: false }} />
          <Stack.Screen name='Feedback' component={FeedbackScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
