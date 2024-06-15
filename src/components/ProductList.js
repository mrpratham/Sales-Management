// components/ProductList.js
import React from 'react';
import { products } from '../sampleData.js'; // Import sample data

const ProductList = () => {
  return (
    <div>
      <h2>Product List</h2>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Category: {product.category}</p>
          <p>Characteristics: {product.characteristics}</p>
          <p>Brand: {product.brand}</p>
          <h4>SKUs:</h4>
          <ul>
            {product.sku.map(sku => (
              <li key={sku.id}>
                <p>Selling Price: {sku.selling_price}</p>
                <p>Max Retail Price: {sku.max_retail_price}</p>
                <p>Amount: {sku.amount}</p>
                <p>Unit: {sku.unit}</p>
                <p>Quantity in Inventory: {sku.quantity_in_inventory}</p>
              </li>
            ))}
          </ul>
          <p>Updated On: {product.updated_on}</p>
          <p>Adding Date: {product.adding_date}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
