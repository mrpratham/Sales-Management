import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import SaleOrderDetailsPage from './components/SaleOrderDetailsPage';

import DarkModeToggle from './components/DarkModeToggle';
import ActiveSaleOrders from './components/ActiveSaleOrders';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <DarkModeToggle />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/orders" element={<ActiveSaleOrders />} />
            <Route path="/sale-order/:customerId" component={SaleOrderDetailsPage} />

            <Route path="*" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
};

export default App;
