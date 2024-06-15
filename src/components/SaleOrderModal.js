// src/components/SaleOrderModal.js
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import SaleOrderForm from './SaleOrderForm';

const SaleOrderModal = ({ isOpen, onClose, initialData, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SaleOrderForm onSubmit={onSubmit} initialData={initialData} />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderModal;
