import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (product) => {
  const response = await axios.put(`${API_URL}/products/${product.id}`, product);
  return response.data;
};

export const fetchCompletedOrders = async () => {
  const response = await axios.get(`${API_URL}/completed-orders`);
  return response.data;
};
