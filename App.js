import React, { useEffect , useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ProductProvider } from './src/context/ProductContext'
import { UserProvider } from './src/context/UserContext';



export default function App() {

  return (
    <UserProvider>
      <ProductProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      </ProductProvider>
    </UserProvider>
    
  );
}
