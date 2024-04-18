const express = require('express');
const knex = require('knex')(require('../knexfile'));
const inventoryRoutes = express.Router();

//Create Inventory Item- Post
inventoryRoutes.post('/', async (req, res) => {
  console.log('Attempting to create a new inventory item...', req.body);
  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  // Validation for fields
  if (
    !warehouse_id ||
    !item_name ||
    !description ||
    !category ||
    !status ||
    quantity === undefined
  ) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validation for quantity
  const numericQuantity = Number(quantity);
  if (isNaN(numericQuantity) || !Number.isInteger(numericQuantity)) {
    return res
      .status(400)
      .json({ message: 'Quantity must be an integer number.' });
  }

  // Check if warehouse_id exists
  const warehouseExists = await knex('warehouses')
    .where('id', warehouse_id)
    .first();
  if (!warehouseExists) {
    return res.status(400).json({ message: 'Warehouse ID does not exist.' });
  }

  try {
    // Insert new inventory item
    const [newInventoryItem] = await knex('inventories').insert(
      {
        warehouse_id,
        item_name,
        description,
        category,
        status,
        quantity: numericQuantity,
      },
      [
        'warehouse_id',
        'item_name',
        'description',
        'category',
        'status',
        'quantity',
      ]
    );

    res.status(201).json(newInventoryItem);
  } catch (error) {
    console.error('Error creating new inventory item', error);
    res
      .status(500)
      .json({ message: 'Server error while creating new inventory item.' });
  }
});

inventoryRoutes.put('/:id', async (req, res) => {
  try {
    if (
      !req.body.warehouse_id ||
      !req.body.item_name ||
      !req.body.description ||
      !req.body.category ||
      !req.body.status
    ) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    const warehouse = await knex('warehouses').where({
      id: req.body.warehouse_id,
    });

    if (warehouse.length === 0) {
      return res.status(400).json({
        message: `Warehouse with ID ${req.body.warehouse_id} not found`,
      });
    }

    if (req.body.quantity) {
      const numericQuantity = Number(req.body.quantity);
      if (isNaN(numericQuantity) || !Number.isInteger(numericQuantity)) {
        return res
          .status(400)
          .json({ message: 'Quantity must be an integer number.' });
      }
    }

    const rowsUpdated = await knex('inventories')
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Inventory item with ID ${req.params.id} not found`,
      });
    }

    const updatedItem = await knex('inventories')
      .where({ id: req.params.id })
      .first();

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({
      message: `Unable to edit inventory item with ID ${req.params.id}: ${error}`,
    });
  }
});

// // Get all inventory items - V3
// inventoryRoutes.get('/', async (req, res) => {
//   try {
//     const inventories = await knex("inventories")
//     .join("warehouses", "inventories.warehouse_id", "warehouses.id")
//     .select(
//       "inventories.id as id",
//       "warehouses.warehouse_name as warehouse_name",
//       "inventories.item_name as item_name",
//       "inventories.description as description",
//       "inventories.category as category",
//       "inventories.status as status",
//       "inventories.quantity as quantity"
//     );

//     res
//       .status(200)
//       .json(inventories);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Get all inventory - V2
// inventoryRoutes.get('/', async (_req, res) => {
//   try {
//     const data = await knex('inventories');
//     res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(`Error retrieving inventories: ${error}`);
//   }
// });

// Get all inventory items
inventoryRoutes.get('/', async (req, res) => {
  try {
    const inventories = await knex("warehouses")
    .join("inventories", "inventories.warehouse_id", "warehouses.id")
    .select(
      "inventories.id as id",
      "warehouses.warehouse_name as warehouse_name",
      "inventories.item_name as item_name",
      "inventories.description as description",
      "inventories.category as category",
      "inventories.status as status",
      "inventories.quantity as quantity"
    );

    res
      .status(200)
      .json(inventories);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

inventoryRoutes.delete('/:id', async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const inverntoryItems = await knex('inventories').where('id', itemId).delete();
    if (inverntoryItems) {
      return res.sendStatus(200)
    }
    if (inverntoryItems === 0) {
      return res
        .status(404)
        .json({ message: `Inventory with ID ${req.params.id} not found` });
    }

    // No Content response
   //res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete inventory: ${error}`,
    });
  }
});

inventoryRoutes.get('/:id', async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const singleItem = await knex('inventories').where('id', itemId).first();

    if (singleItem) {
      res.status(200).json(singleItem);
    } else {
      res.status(404).json({ error: `No such item with ID ${itemId} exists.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error retrieving item: ${error}` });
  }
});

module.exports = inventoryRoutes;
