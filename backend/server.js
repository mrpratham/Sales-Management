const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const saleOrdersRouter = require('./routes/products');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://root:<root>@sale-orders.dsegazr.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(bodyParser.json());

app.use('/api/sale-orders', saleOrdersRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
