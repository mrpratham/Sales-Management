const mongoose = require('mongoose');

const customerProfileSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  color: [{ type: Number }],
  email: { type: String, required: true },
  pincode: { type: String, required: true },
  location_name: { type: String, required: true },
  type: { type: String, required: true },
  profile_pic: { type: String, default: null },
  gst: { type: String, default: '' }
});

const skuSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  selling_price: { type: Number, required: true },
  max_retail_price: { type: Number, required: true },
  amount: { type: Number, required: true },
  unit: { type: String, required: true },
  quantity_in_inventory: { type: Number, required: true },
  customer: { type: Number, required: true },
  customer_profile: customerProfileSchema,
  product: { type: Number, required: true }
});

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  display_id: { type: Number, required: true },
  owner: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  characteristics: { type: String, required: true },
  features: { type: String, default: '' },
  brand: { type: String, required: true },
  sku: [skuSchema]
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
