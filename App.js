import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ProductProvider } from './context/ProductContext';

export default function App() {
  return (
    <ProductProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ProductProvider>
  );
}
