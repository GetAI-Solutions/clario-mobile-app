import React, { useEffect , useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ProductProvider } from './src/context/ProductContext'
import { UserProvider } from './src/context/UserContext';
import { LanguageProvider } from './src/context/LanguageContext';
import i18n from './src/i18n';



export default function App() {

  return (
    <LanguageProvider>
      <UserProvider>
      <ProductProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      </ProductProvider>
    </UserProvider>
    </LanguageProvider>
    
    
  );
}
