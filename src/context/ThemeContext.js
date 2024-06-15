import React, { createContext, useState, useEffect } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';


export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const chakraTheme = extendTheme({
    config: {
      initialColorMode: theme,
      useSystemColorMode: false,
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ChakraProvider theme={chakraTheme}>
        {children}
      </ChakraProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
