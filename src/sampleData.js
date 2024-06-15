// sampleData.js
export const customers = [
    {
      id: 11908,
      name: "Ram",
      email: "jesus_christ@church.com",
      pincode: "Mumbai",
      location_name: "Mumbai, Maharashtra, India",
      type: "C",
      profile_pic: null,
      gst: "",
    },
    // Add more customers as needed
  ];
  
  export const products = [
    {
      id: 209,
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
          customer_id: 11908,
        },
        // Add more SKUs as needed
      ],
      updated_on: "2024-05-24T12:46:41.995873Z",
      adding_date: "2024-05-24T12:46:41.995828Z",
    },
    // Add more products as needed
  ];
  
  export const saleOrders = [
    {
      customer_id: 11908,
      items: [
        {
          sku_id: 248,
          price: 54,
          quantity: 1,
        },
        // Add more items as needed
      ],
      paid: false,
      invoice_no: "Invoice - 1212121",
      invoice_date: "2024-07-05",
    },
    // Add more sale orders as needed
  ];
  