import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchProducts } from '../api/productApi';
import ProductForm from './ProductForm';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  IconButton,
  Button
} from '@chakra-ui/react';
import { EditIcon, ViewIcon } from '@chakra-ui/icons';

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { data: products, isLoading } = useQuery('products', fetchProducts);

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  return (
    <Box p={5}>
      <Button colorScheme="blue" onClick={handleAddProduct} mb={4}>
        + Add Product
      </Button>
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products?.map(product => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>{product.name}</Td>
              <Td>{product.category}</Td>
              <Td>
                <IconButton
                  icon={<ViewIcon />}
                  onClick={() => handleEditProduct(product)}
                />
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => handleEditProduct(product)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {isModalOpen && (
        <ProductForm
          product={currentProduct}
          onSubmit={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
          readOnly={!currentProduct}
        />
      )}
    </Box>
  );
};

export default Products;
