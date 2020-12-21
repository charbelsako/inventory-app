const express = require("express");
const router = express.Router();
const database = require("../database");
const databaseInstance = new database('pg');

router.post('/add/:id', async (request, response) => {
  try {
    const id = request.params.id;
    // check if item is for_sale.
    const data = await databaseInstance.queryWithValues("SELECT id FROM items WHERE id = $1 AND for_sale = true", [id]);

    if (data.length > 0) {
      console.log("adding item");
      await databaseInstance.insertWithValues("INSERT INTO cart (item_id) VALUES($1)", [id]);
      response.status(200).send("Item added to cart")
    } else {
      response.status(200).send("Item is not for sale")
    }

  } catch (e) {
    console.log(e)
    response.status(400).send("Item couldn't be added to cart")
  }
})

module.exports = router;