const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;

const warehouseRoutes = require('./routes/warehouseRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

app.use(cors());

app.use(express.json());

app.use('/api/inventories', inventoryRoutes);
app.use('/api/warehouses', warehouseRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
