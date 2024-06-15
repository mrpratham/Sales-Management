// components/CustomerList.js
import React from 'react';
import { customers } from '../sampleData'; // Import sample data

const CustomerList = () => {
  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            <p>Name: {customer.name}</p>
            <p>Email: {customer.email}</p>
            {/* Render other customer details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
