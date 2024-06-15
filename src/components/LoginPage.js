import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box, Button, Input, VStack, Heading, FormControl, FormLabel,
  useColorModeValue, Text, Stack, useToast
} from '@chakra-ui/react';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      await login(data.username, data.password);
      navigate('/orders');
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your username and password',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        w="full"
        maxW="md"
      >
        <Heading mb={6} textAlign="center" size="lg">
          Login
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                {...register('username', { required: true })}
                bg={useColorModeValue('gray.100', 'gray.600')}
                _hover={{ bg: useColorModeValue('gray.200', 'gray.500') }}
                _focus={{ borderColor: 'teal.400' }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register('password', { required: true })}
                bg={useColorModeValue('gray.100', 'gray.600')}
                _hover={{ bg: useColorModeValue('gray.200', 'gray.500') }}
                _focus={{ borderColor: 'teal.400' }}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              width="full"
              size="lg"
              _hover={{ boxShadow: 'md' }}
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};



export default LoginPage;
