import axios from './axios';

export const fetchActiveOrders = async () => {
  const response = await axios.get('/orders?status=active');
  return response.data;
};

export const fetchCompletedOrders = async () => {
  const response = await axios.get('/orders?status=completed');
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await axios.post('/orders', orderData);
  return response.data;
};
