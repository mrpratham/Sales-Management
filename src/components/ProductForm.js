import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  VStack,
} from '@chakra-ui/react';

const ProductForm = ({ product, onSubmit, onClose, readOnly = false }) => {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: product || {
      id: '',
      display_id: '',
      owner: '',
      name: '',
      category: '',
      characteristics: '',
      features: '',
      brand: '',
      sku: []
    }
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'sku'
  });

  useEffect(() => {
    reset(product || {
      id: '',
      display_id: '',
      owner: '',
      name: '',
      category: '',
      characteristics: '',
      features: '',
      brand: '',
      sku: []
    });
  }, [product, reset]);

  const handleFormSubmit = (data) => {
    if (!readOnly) {
      onSubmit(data);
    }
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{product ? 'Edit Product' : 'Create Product'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <VStack spacing={4}>
              <FormControl isReadOnly={readOnly} mb={4}>
                <FormLabel>ID</FormLabel>
                <Input {...register('id')} />
              </FormControl>
              <FormControl isReadOnly={readOnly} mb={4}>
                <FormLabel>Display ID</FormLabel>
                <Input {...register('display_id')} />
              </FormControl>
              <FormControl isReadOnly={readOnly} mb={4}>
                <FormLabel>Owner</FormLabel>
                <Input {...register('owner')} />
              </FormControl>
              <FormControl isReadOnly={readOnly} mb={4}>
                <FormLabel>Name</FormLabel>
                <Input {...register('name')} />
              </FormControl>
              <FormControl isReadOnly={readOnly} mb={4}>
                <FormLabel>Category</FormLabel>
                <Input {...register('category')} />
              </FormControl>
              <FormControl isReadOnly={readOnly} mb={4}>
                <FormLabel>Characteristics</FormLabel>
                <Input {...register('characteristics')} />
              </FormControl>
              <FormControl isReadOnly={readOnly} mb={4}>
                <FormLabel>Features</FormLabel>
                <Input {...register('features')} />
              </FormControl>
              <FormControl isReadOnly={readOnly} mb={4}>
                <FormLabel>Brand</FormLabel>
                <Input {...register('brand')} />
              </FormControl>
              <Box>
                <FormLabel>SKUs</FormLabel>
                {fields.map((field, index) => (
                  <Box key={field.id} mb={4}>
                    <FormControl isReadOnly={readOnly} mb={2}>
                      <FormLabel>Selling Price</FormLabel>
                      <Input {...register(`sku.${index}.selling_price`)} />
                    </FormControl>
                    <FormControl isReadOnly={readOnly} mb={2}>
                      <FormLabel>Max Retail Price</FormLabel>
                      <Input {...register(`sku.${index}.max_retail_price`)} />
                    </FormControl>
                    <FormControl isReadOnly={readOnly} mb={2}>
                      <FormLabel>Amount</FormLabel>
                      <Input {...register(`sku.${index}.amount`)} />
                    </FormControl>
                    <FormControl isReadOnly={readOnly} mb={2}>
                      <FormLabel>Unit</FormLabel>
                      <Input {...register(`sku.${index}.unit`)} />
                    </FormControl>
                    <FormControl isReadOnly={readOnly} mb={2}>
                      <FormLabel>Quantity in Inventory</FormLabel>
                      <Input {...register(`sku.${index}.quantity_in_inventory`)} />
                    </FormControl>
                    <FormControl isReadOnly={readOnly} mb={2}>
                      <FormLabel>Customer</FormLabel>
                      <Input {...register(`sku.${index}.customer`)} />
                    </FormControl>
                    <FormControl isReadOnly={readOnly} mb={2}>
                      <FormLabel>Customer Name</FormLabel>
                      <Input {...register(`sku.${index}.customer_profile.name`)} />
                    </FormControl>
                    <FormControl isReadOnly={readOnly} mb={2}>
                      <FormLabel>Customer Email</FormLabel>
                      <Input {...register(`sku.${index}.customer_profile.email`)} />
                    </FormControl>
                  </Box>
                ))}
                {!readOnly && (
                  <Button onClick={() => append({})}>Add SKU</Button>
                )}
              </Box>
            </VStack>
            {!readOnly && (
              <Button type="submit" colorScheme="blue" mt={4}>
                {product ? 'Save' : 'Create'}
              </Button>
            )}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductForm;
