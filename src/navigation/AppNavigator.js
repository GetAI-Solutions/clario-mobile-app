import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/authScreens/LandingScreen';
import SignupScreen from '../screens/authScreens/SignupScreen';
import LoginScreen from '../screens/authScreens/LoginScreen';
import NoProductHistoryScreen from '../screens/mainScreens/NoProductHistoryScreen';
import VerifyPhone from '../screens/authScreens/verifyPhone';
import AddEmail from '../screens/authScreens/addEmail';
import ScannerScreen from '../screens/mainScreens/ScannerScreen';
import UploadScreen from '../screens/mainScreens/UploadScreen';
import Chatbot from '../screens/mainScreens/Chatbot';
import OnboardingScreen from '../screens/onboardingScreens/OnboardingScreen';
import UserContext from '../context/UserContext';
import FeedbackScreen from '../screens/mainScreens/FeedbackScreen';
import TabNavigator from './TabNavigator';
import HomeScreen from '../screens/mainScreens/HomeScreen';
import ProductNotFoundScreen from '../screens/mainScreens/ProductNotFoundScreen';
import FaqPage from '../screens/mainScreens/FaqPage';
import ForgotPassword from '../screens/authScreens/ForgotPassword';
import OTPPage from '../screens/authScreens/OTPPage';
import PasswordReset from '../screens/authScreens/PasswordReset';
import TermsPage from '../screens/mainScreens/TermsAndConditions';
import OnboardingPages from '../screens/onboardingScreens/OnboardingPages';

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
          <Stack.Screen name="OnboardingPages" component={OnboardingPages} options={{ headerShown: false }} />
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EmailSignup" component={AddEmail} options={{ headerShown: false }} />
          <Stack.Screen name="VerifyEmail" component={VerifyPhone} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="OTPPage" component={OTPPage} options={{ headerShown: false }} />
          <Stack.Screen name="PasswordReset" component={PasswordReset} options={{ headerShown: false }} />
          <Stack.Screen name='Terms' component={TermsPage} options={{headerShown: false}}/>
        </>
      ) : (
        <>

          <Stack.Screen name="MainTabScreen" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="NoProductHistory" component={NoProductHistoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="UploadScreen" component={UploadScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ScannerScreen" component={ScannerScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Chatbot" component={Chatbot} options={{ headerShown: false }} />
          <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ headerShown: false }} />
          <Stack.Screen name='ProductNotFound' component={ProductNotFoundScreen} options={{headerShown: false}} />
          <Stack.Screen name='FAQ' component={FaqPage} options={{headerShown: false}}/>
          <Stack.Screen name='Terms' component={TermsPage} options={{headerShown: false}}/>
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
