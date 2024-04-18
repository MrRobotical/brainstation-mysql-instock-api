
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const wareouseData = require("../seed-data/warehouses");
const inventoryData = require("../seed-data/inventories");
exports.seed = async function (knex) {
  await knex('warehouses').del();
  await knex('inventories').del();
  await knex("warehouses").insert(wareouseData);
  await knex("inventories").insert(inventoryData);
};
