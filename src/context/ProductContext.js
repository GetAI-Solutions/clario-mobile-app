import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from './UserContext';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user) {
          setLoading(true);
          const storedProducts = await AsyncStorage.getItem(`products_${user.uid}`);
          if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
          }
        }
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user]);
  
  useEffect(() => {
    const storeProducts = async () => {
      try {
        if (user && products.length > 0) {
          await AsyncStorage.setItem(`products_${user.uid}`, JSON.stringify(products));
        }
      } catch (error) {
        console.error('Failed to store products:', error);
      }
    };
    storeProducts();
  }, [products, user]);
  

  const addProduct = async (product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
  };

  const deleteProduct = async (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, loading, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;