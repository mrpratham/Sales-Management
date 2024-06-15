import React from 'react';
import { useQuery } from 'react-query';
import { fetchCompletedOrders } from '../api/productApi';

const CompletedSaleOrders = () => {
  const { data, error, isLoading } = useQuery('completedOrders', fetchCompletedOrders);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Completed Sale Orders</h2>
      <ul>
        {data.map((order) => (
          <li key={order.id}>{order.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedSaleOrders;
