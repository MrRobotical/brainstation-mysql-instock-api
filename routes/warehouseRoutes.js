const express = require('express');
const knex = require('knex')(require('../knexfile'));
const warehouseRoutes = express.Router();

// Add warehouse route
warehouseRoutes.post('/', async (req, res) => {
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  // Validation for presence
  if (
    !warehouse_name ||
    !address ||
    !city ||
    !country ||
    !contact_name ||
    !contact_position ||
    !contact_phone ||
    !contact_email
  ) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validation for characters
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\+1|1)?[\s.-]?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;

  if (!emailRegex.test(contact_email) || !phoneRegex.test(contact_phone)) {
    return res
      .status(400)
      .json({ message: 'Invalid email address or phone number.' });
  }

  try {
    const [newWarehouse] = await knex('warehouses').insert(
      {
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
      },
      [
        'id',
        'warehouse_name',
        'address',
        'city',
        'country',
        'contact_name',
        'contact_position',
        'contact_phone',
        'contact_email',
      ]
    );

    res.status(201).json(newWarehouse);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server error while creating new warehouse.' });
  }
});

//Edit warehouse route
warehouseRoutes.put('/:id', async (req, res) => {
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  //Validation for presence
  if (
    !warehouse_name ||
    !address ||
    !city ||
    !country ||
    !contact_name ||
    !contact_position ||
    !contact_phone ||
    !contact_email
  ) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validation for characters
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\+1|1)?[\s.-]?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;
  // const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

  if (!emailRegex.test(contact_email) || !phoneRegex.test(contact_phone)) {
    return res
      .status(400)
      .json({ message: 'Invalid email address or phone number.' });
  }

  try {
    const id = parseInt(req.params.id);
    const updated = await knex('warehouses').where({ id }).update({
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    });

    if (updated) {
      const updatedWarehouse = await knex('warehouses').where({ id }).first();
      res.status(200).json(updatedWarehouse);
    } else {
      res.status(404).json({ message: 'Warehouse not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all warehouses
warehouseRoutes.get('/', async (_req, res) => {
  try {
    const data = await knex('warehouses');
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error retrieving Warehouses: ${error}`);
  }
});

//Get Inventory for a given warehouse
warehouseRoutes.get('/:id/inventories', async (req, res) => {
  try {
    const { id } = req.params;
    const warehouseid = await knex('warehouses').where('id', id).first();
    if (!warehouseid) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    const inventories = await knex('inventories')
      .select(
        'inventories.id as inventory_id',
        'inventories.item_name',
        'inventories.description',
        'inventories.category',
        'inventories.status',
        'inventories.quantity',
        'inventories.created_at',
        'inventories.updated_at',
        'warehouses.id as warehouse_id',
        'warehouses.warehouse_name',
        'warehouses.address',
        'warehouses.city',
        'warehouses.country',
        'warehouses.contact_name',
        'warehouses.contact_position',
        'warehouses.contact_email',
        'warehouses.contact_phone'
      )
      .join('warehouses', 'inventories.warehouse_id', 'warehouses.id')
      .where('inventories.warehouse_id', id);

    res.status(200).json(inventories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single warehouse
warehouseRoutes.get('/:id', async (req, res) => {
  try {
    const warehouseId = parseInt(req.params.id);
    const singleWarehouse = await knex('warehouses')
      .where('id', warehouseId)
      .first();

    if (singleWarehouse) {
      res.status(200).json(singleWarehouse);
    } else {
      res
        .status(404)
        .json({ error: `No such warehouse with ID ${warehouseId} exists.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error retrieving Warehouse: ${error}` });
  }
});

warehouseRoutes.delete('/:id', async (req, res) => {
  try {
    const warehouseItems = await knex('warehouses')
      .where({ id: req.params.id })
      .delete();
    if (warehouseItems) {
      return res.status(200);
    }
    if (warehouseItems === 0) {
      return res
        .status(404)
        .json({ message: `Warehouse with ID ${req.params.id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete warehouse: ${error}`,
    });
  }
});

// Export the router
module.exports = warehouseRoutes;
