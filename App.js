import React, { useEffect , useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ProductProvider } from './src/context/ProductContext'
import { UserProvider } from './src/context/UserContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


export default function App() {

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <StatusBar style="auto" />
        <LanguageProvider>
        <UserProvider>
        <ThemeProvider>
          <ProductProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
          </ProductProvider>
        </ThemeProvider>
        
      </UserProvider>
      </LanguageProvider>
    </SafeAreaProvider>
    
    
    
  );
}
