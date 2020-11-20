const express = require('express');
const router = express.Router();
// database module
const database = require("../database");
const databaseInstance = new database("pg");

router.get('/', async (request, response) => {
    //* Query the database
    let items = await databaseInstance.query("SELECT items.id, items.quantity, items.name, items.price, items.date_added, items.for_sale, items.price, items.expiry_date, categories.name categoryName from items JOIN categories ON items.category = categories.id;");

    // console.log(items)

    const data = {
        items
    }

    return response.status(200).render("index", data);
});

router.get('/edit/:id', async (request, response)=>{
  const id = request.params.id;
  try{
    const item = await databaseInstance.queryOne(`SELECT items.id, items.quantity, items.name, items.price, items.date_added, items.for_sale, items.price, items.expiry_date, categories.id as categoryId, categories.name categoryName FROM items JOIN categories ON categories.id = items.category WHERE items.id = ${id} LIMIT 1`);

    const categories = await databaseInstance.query("SELECT id, name FROM categories ORDER BY id;");

    //get all categories
    console.log(item);
    return response.render("edititem", {item, categories})
  } catch(e) {
    console.log(e.message);
  }
})


module.exports = router;
