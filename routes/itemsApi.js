const express = require('express');
const router = express.Router()

const database = require("../database");
const databaseInstance = new database("pg");

// Get all items
router.get('/', async (request, response) => {
    //* Query the database
    let items = await databaseInstance.query("SELECT items.id, items.quantity, items.name, items.price, items.date_added, items.for_sale, items.price, items.expiry_date, categories.name categoryName from items JOIN categories ON items.category = categories.id;");

    // console.log(items)

    const data = {
        items
    }

    return response.status(200).send(data);
});

// Get one item
router.get('/:id', async (request, response) => {
  const id = request.params.id;
  //* Query the database
  let item = await databaseInstance.queryOne("SELECT items.id, items.quantity, items.name, items.price, items.date_added, items.for_sale, items.price, items.expiry_date, categories.name categoryName from items JOIN categories ON items.category = categories.id; WHERE id="+id);

  const data = {
      item
  }

  return response.status(200).send(data);
});

// Delete an item
router.delete('/delete/:id', async (request, response) => {
  const id = request.params.id;
  try{
    const deleteQuery = `DELETE FROM items WHERE id = ${id}`;

    await databaseInstance.query(deleteQuery);

    return response.send("Item deleted successfully");
  } catch(e) {
    console.log(e)
    return response.send(e.message);
  }
})

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
  try {
    const insertItemQuery = `INSERT INTO items (name, price, expiry_date, category, for_sale, quantity) VALUES ('${name}', ${price}, ${expiry_date}, ${category}, ${for_sale}, ${quantity})`

    await databaseInstance.insert(insertItemQuery)

    return response.redirect('/')
  } catch (e) {
    console.log(e.message);
  }

});

router.put('/edit/:id', async (request, response) => {
  const id = request.params.id;
  const name = request.body.name;
  const price = request.body.price;
  const expiry_date = request.body.expiry_date || null;
  const category = request.body.category;
  const quantity = request.body.quantity
  const for_sale = request.body.for_sale == "on" ? true : false;
  console.log(request.body);
  console.log(request.body.name);
  // Add the value to the database
  try {
    const updateItemQuery = `UPDATE items SET name='${name}', price=${price}, expiry_date=${expiry_date}, category=${category}, for_sale=${for_sale}, quantity=${quantity} WHERE id=${id}`;

    const result = await databaseInstance.update(updateItemQuery);

    return response.send(result);
  } catch (e) {
    console.log(e.message);
  }


});

module.exports = router;