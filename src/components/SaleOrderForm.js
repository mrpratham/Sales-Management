import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, FormLabel, FormControl } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SaleOrderForm = ({ onSubmit, initialData = {} }) => {
  // Log initialData to the console to verify its structure
  console.log('initialData:', initialData);
  console.log('initialData.items:', initialData.items);

  // Ensure useForm is called unconditionally at the top level
  const { handleSubmit, register, control, formState: { errors } } = useForm({
    defaultValues: initialData,
  });

  // Safely access items array with fallback
  const items = initialData.items ?? [];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.customer_id}>
        <FormLabel>Customer ID</FormLabel>
        <Input {...register('customer_id', { required: 'Customer ID is required' })} />
        {errors.customer_id && <p>{errors.customer_id.message}</p>}
      </FormControl>

      <FormControl isInvalid={errors.invoice_no}>
        <FormLabel>Invoice Number</FormLabel>
        <Input {...register('invoice_no', { required: 'Invoice number is required' })} />
        {errors.invoice_no && <p>{errors.invoice_no.message}</p>}
      </FormControl>

      <FormControl isInvalid={errors.invoice_date}>
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

      <FormControl isInvalid={errors.items}>
        <FormLabel>Items</FormLabel>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index}>
              <Input
                placeholder="SKU ID"
                {...register(`items[${index}].sku_id`, { required: 'SKU ID is required' })}
              />
              <Input
                placeholder="Price"
                {...register(`items[${index}].price`, { required: 'Price is required' })}
              />
              <Input
                placeholder="Quantity"
                {...register(`items[${index}].quantity`, { required: 'Quantity is required' })}
              />
            </div>
          ))
        ) : (
          <p>No items available</p>
        )}
        {errors.items && <p>{errors.items.message}</p>}
      </FormControl>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default SaleOrderForm;
