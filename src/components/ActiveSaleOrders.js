import React, { useEffect, useState } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Button, Text,
  useColorMode, useColorModeValue, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Input, useDisclosure
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom'; // Import Link from React Router
import 'react-datepicker/dist/react-datepicker.css';

// Mock function to fetch customer details based on customer_id
const fetchCustomerDetails = async (customerId) => {
  // Placeholder - replace with your actual data fetching logic
  const customers = {
    11908: {
      id: 11908,
      name: 'Ram',
      color: [182, 73, 99],
      email: 'jesus_christ@church.com',
      pincode: 'Mumbai',
      location_name: 'Mumbai, Maharashtra, India',
      type: 'C',
      profile_pic: null,
      gst: '',
    },
    // Add other customers as needed
  };
  return customers[customerId];
};

const fetchActiveSaleOrders = async () => {
  // Placeholder - replace with your actual data fetching logic
  const saleOrders = [
    {
      customer_id: 11908,
      items: [
        {
          sku_id: 248,
          price: 54,
          quantity: 1,
        },
      ],
      paid: false,
      invoice_no: 'Invoice - 1212121',
      invoice_date: '2024-07-05',
    },
    {
      customer_id: 11908,
      items: [
        {
          sku_id: 247,
          price: 32,
          quantity: 1,
        },
      ],
      paid: false,
      invoice_no: 'Invoice - 1212122',
      invoice_date: '2024-07-06',
    },
    // Add more sale orders as needed
  ];

  // Fetch customer details for each sale order
  const saleOrdersWithData = await Promise.all(saleOrders.map(async (order) => {
    const customerDetails = await fetchCustomerDetails(order.customer_id);
    return { ...order, customer: customerDetails };
  }));

  return saleOrdersWithData;
};

const fetchProductDetails = async (skuId) => {
  // Placeholder - replace with your actual data fetching logic
  const products = {
    248: {
      id: 209,
      display_id: 8,
      owner: 1079,
      name: "New Product",
      category: "The god of War",
      characteristics: "New Product Characteristics",
      brand: "New Product Brand",
      sku: [
        {
          id: 248,
          selling_price: 54,
          max_retail_price: 44,
          amount: 33,
          unit: "kg",
          quantity_in_inventory: 0,
          product: 209
        },
      ],
      updated_on: "2024-05-24T12:46:41.995873Z",
      adding_date: "2024-05-24T12:46:41.995828Z"
    },
    // Add other products as needed
  };
  return products[skuId];
};

const ActiveSaleOrders = () => {
  const [saleOrders, setSaleOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.200', 'black');
  const textColor = useColorModeValue('black', 'white');
  const tableBg = useColorModeValue('white', 'gray.800');
  const theadBg = useColorModeValue('gray.100', 'teal.600');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isProductOpen, onOpen: onProductOpen, onClose: onProductClose } = useDisclosure();
  const { handleSubmit, register, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      customer_id: '',
      invoice_no: '',
      invoice_date: new Date(),
      items: [{ sku_id: '', price: '', quantity: '' }],
    },
  });

  useEffect(() => {
    const getSaleOrders = async () => {
      const data = await fetchActiveSaleOrders();
      setSaleOrders(data);
    };
    getSaleOrders();
  }, []);

  const onSubmit = (data) => {
    setSaleOrders([...saleOrders, data]);
    reset();
    onClose();
  };

  const handleProductClick = async (skuId) => {
    const productDetails = await fetchProductDetails(skuId);
    setSelectedProduct(productDetails);
    onProductOpen();
  };

  return (
    <Box bg={bg} color={textColor} p={5}>
      <Box display="flex" justifyContent="space-between" mb={5}>
        <Button onClick={toggleColorMode} colorScheme="teal">
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
        <Button colorScheme="teal">Active Sale Orders</Button>
        <Button colorScheme="teal">Completed Sale Orders</Button>
        <Button onClick={onOpen} colorScheme="teal">+ Sale Order</Button>
      </Box>
      <Table variant="simple" bg={tableBg} borderRadius="md" overflow="hidden">
        <Thead bg={theadBg}>
          <Tr>
            <Th color={textColor}>ID</Th>
            <Th color={textColor}>Customer Name</Th>
            <Th color={textColor}>Price (₹)</Th>
            <Th color={textColor}>Last Modified</Th>
            <Th color={textColor}>Edit/View</Th>
            <Th color={textColor}>Product Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          {saleOrders.map((order, index) => (
            <Tr key={index} bg={tableBg}>
              <Td>{index + 1}</Td>
              <Td display="flex" alignItems="center">
                <Box
                  as="span"
                  bg="green.500"
                  borderRadius="full"
                  width="24px"
                  height="24px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mr={2}
                >
                  {order.customer_id}
                </Box>
                <Text>{order.customer.name}</Text>
              </Td>
              <Td>₹ {order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</Td>
              <Td>{new Date(order.invoice_date).toLocaleDateString()}</Td>
              <Td>
                <Button size="sm" colorScheme="teal">
                  <Link to={`/sale-order/${order.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    Edit/View
                  </Link>
                </Button>
              </Td>
              <Td>
                <Button size="sm" colorScheme="teal" onClick={() => handleProductClick(order.items[0].sku_id)}>
                  View Product
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Sale Order Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Sale Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.customer_id} mb={4}>
                <FormLabel>Customer ID</FormLabel>
                <Input {...register('customer_id', { required: 'Customer ID is required' })} />
                {errors.customer_id && <p>{errors.customer_id.message}</p>}
              </FormControl>

              <FormControl isInvalid={errors.invoice_no} mb={4}>
                <FormLabel>Invoice Number</FormLabel>
                <Input {...register('invoice_no', { required: 'Invoice number is required' })} />
                {errors.invoice_no && <p>{errors.invoice_no.message}</p>}
              </FormControl>

              <FormControl isInvalid={errors.invoice_date} mb={4}>
                <FormLabel>Invoice Date</FormLabel>
                <Controller
                  name="invoice_date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="yyyy-MM-dd"
                    />
                  )}
                  rules={{ required: 'Invoice date is required' }}
                />
                {errors.invoice_date && <p>{errors.invoice_date.message}</p>}
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Items</FormLabel>
                {saleOrders.items?.map((item, index) => (
                  <Box key={index} mb={2}>
                    <FormControl isInvalid={errors.items?.[index]?.sku_id}>
                      <FormLabel>SKU ID</FormLabel>
                      <Input {...register(`items[${index}].sku_id`, { required: 'SKU ID is required' })} />
                      {errors.items?.[index]?.sku_id && <p>{errors.items[index].sku_id.message}</p>}
                    </FormControl>

                    <FormControl isInvalid={errors.items?.[index]?.price}>
                      <FormLabel>Price</FormLabel>
                      <Input {...register(`items[${index}].price`, { required: 'Price is required' })} />
                      {errors.items?.[index]?.price && <p>{errors.items[index].price.message}</p>}
                    </FormControl>

                    <FormControl isInvalid={errors.items?.[index]?.quantity}>
                      <FormLabel>Quantity</FormLabel>
                      <Input {...register(`items[${index}].quantity`, { required: 'Quantity is required' })} />
                      {errors.items?.[index]?.quantity && <p>{errors.items[index].quantity.message}</p>}
                    </FormControl>
                  </Box>
                ))}
              </FormControl>
              <Button type="submit" colorScheme="teal">Submit</Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Product Details Modal */}
      <Modal isOpen={isProductOpen} onClose={onProductClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Product Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedProduct ? (
              <Box>
                <Text>ID: {selectedProduct.id}</Text>
                <Text>Name: {selectedProduct.name}</Text>
                <Text>Category: {selectedProduct.category}</Text>
                <Text>Brand: {selectedProduct.brand}</Text>
                <Text>Characteristics: {selectedProduct.characteristics}</Text>
                <Text>Selling Price: ₹{selectedProduct.sku[0].selling_price}</Text>
                <Text>Max Retail Price: ₹{selectedProduct.sku[0].max_retail_price}</Text>
                <Text>Quantity in Inventory: {selectedProduct.sku[0].quantity_in_inventory}</Text>
              </Box>
            ) : (
              <Text>Loading...</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onProductClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ActiveSaleOrders;
