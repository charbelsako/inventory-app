const express = require("express");
const router = express.Router();
const database = require("../database");
const databaseInstance = new database('pg');

router.get('/', async (request, response) => {
  // get all the cart elements
  const data = await databaseInstance.query("SELECT * FROM cart JOIN items ON cart.item_id = items.id;");
  // TODO: get the total

  // display the cart
  response.status(200).render('cart', {data})
})

module.exports = router;