import React, { useEffect, useState } from 'react';
import {
  Box, Heading, Text, Button, Table, Thead, Tbody, Tr, Th, Td,
  useColorMode, useColorModeValue, FormControl, FormLabel, Input
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom'; // Using useParams from React Router
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Mock function to fetch sale order details based on order ID
const fetchSaleOrderDetails = async (orderId) => {
  // Placeholder - replace with your actual data fetching logic
  const saleOrders = [
    {
      id: '1',
      customer: {
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
    // Add other sale orders as needed
  ];

  return saleOrders.find(order => order.id === orderId);
};

const SaleOrderDetailsPage = () => {
  const { orderId } = useParams(); // Fetch orderId from URL params
  const [saleOrder, setSaleOrder] = useState(null);
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue('black', 'white');
  const tableBg = useColorModeValue('white', 'gray.800');
  const theadBg = useColorModeValue('gray.100', 'teal.600');
  const { handleSubmit, register, control, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const getSaleOrderDetails = async () => {
      const data = await fetchSaleOrderDetails(orderId);
      setSaleOrder(data);
      reset(data);
    };
    getSaleOrderDetails();
  }, [orderId, reset]);

  const onSubmit = (data) => {
    // Handle form submission
    console.log('Updated Data:', data);
  };

  if (!saleOrder) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={5}>
      <Box display="flex" justifyContent="space-between" mb={5}>
        <Heading size="md">Sale Order Details - {saleOrder.invoice_no}</Heading>
        <Button colorScheme="teal" onClick={handleSubmit(onSubmit)}>Save</Button>
      </Box>
      <Box>
        <form>
          <FormControl mb={4}>
            <FormLabel>Customer Name</FormLabel>
            <Input value={saleOrder.customer.name} isReadOnly />
          </FormControl>
          <FormControl mb={4} isInvalid={errors.invoice_no}>
            <FormLabel>Invoice Number</FormLabel>
            <Input
              {...register('invoice_no', { required: 'Invoice number is required' })}
              defaultValue={saleOrder.invoice_no}
            />
            {errors.invoice_no && <Text color="red.500">{errors.invoice_no.message}</Text>}
          </FormControl>
          <FormControl mb={4} isInvalid={errors.invoice_date}>
            <FormLabel>Invoice Date</FormLabel>
            <Controller
              name="invoice_date"
              control={control}
              defaultValue={new Date(saleOrder.invoice_date)}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy-MM-dd"
                />
              )}
              rules={{ required: 'Invoice date is required' }}
            />
            {errors.invoice_date && <Text color="red.500">{errors.invoice_date.message}</Text>}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Items</FormLabel>
            <Table variant="simple" bg={tableBg} borderRadius="md" overflow="hidden">
              <Thead bg={theadBg}>
                <Tr>
                  <Th color={textColor}>SKU ID</Th>
                  <Th color={textColor}>Price (₹)</Th>
                  <Th color={textColor}>Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {saleOrder.items.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.sku_id}</Td>
                    <Td>{item.price}</Td>
                    <Td>{item.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default SaleOrderDetailsPage;
