import React, { useEffect , useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ProductProvider } from './src/context/ProductContext'
import { UserProvider } from './src/context/UserContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { ThemeProvider } from './src/context/ThemeContext';


export default function App() {

  return (
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
    
    
  );
}
