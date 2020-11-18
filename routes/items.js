const express = require("express");
const router = express.Router();
const database = require("../database");
const databaseInstance = new database('pg');

router.get('/', async (request, response) => {
  const categories = await databaseInstance.query("SELECT id, name FROM categories ORDER BY id;");

  const data = {
    categories
  }

  response.render("additem", data)
});

// Add a new item
router.post('/add', async (request, response) => {
  const name = request.body.name;
  const price = request.body.price;
  const expiry_date = request.body.expiry_date || null;
  const category = request.body.category;
  const quantity = request.body.quantity
  const for_sale = request.body.for_sale == "on" ? true : false;
  console.log(request.body)
  // Add the value to the database
  const result = await databaseInstance.insert(`INSERT INTO items (name, price, expiry_date, category, for_sale, quantity) VALUES ('${name}', ${price}, ${expiry_date}, ${category}, ${for_sale}, ${quantity})`)

  response.redirect('/')
});

module.exports = router;