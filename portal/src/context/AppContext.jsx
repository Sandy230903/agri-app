import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

    useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <AppContext.Provider value={{ products, setProducts }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);