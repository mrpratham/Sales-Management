// src/pages/SaleOrders.js
import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchActiveOrders, fetchCompletedOrders, createOrder } from '../api/orderApi';
import ActiveSaleOrders from '../components/ActiveSaleOrders';
import CompletedSaleOrders from '../components/CompletedSaleOrders';
import SaleOrderModal from '../components/SaleOrderModal';

const SaleOrders = () => {
  const queryClient = useQueryClient();
  const { data: activeOrders } = useQuery('activeOrders', fetchActiveOrders);
  const { data: completedOrders } = useQuery('completedOrders', fetchCompletedOrders);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const mutation = useMutation(createOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('activeOrders');
      setIsModalOpen(false);
    },
  });

  const openModal = (order = null) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleOrderSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Button onClick={() => openModal()}>+ Sale Order</Button>
            <ActiveSaleOrders orders={activeOrders} onEdit={openModal} />
          </TabPanel>
          <TabPanel>
            <CompletedSaleOrders orders={completedOrders} onView={openModal} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <SaleOrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialData={selectedOrder}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
};

export default SaleOrders;
