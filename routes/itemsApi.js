const express = require('express');
const router = express.Router()

const database = require("../database");
const databaseInstance = new database("pg");

// Get all items
router.get('/', async (request, response) => {
    //* Query the database
    let items = await databaseInstance.query("SELECT * FROM itemsView");

    const data = {
        items
    }

    return response.status(200).send(data);
});

// Get one item
router.get('/:id', async (request, response) => {
  const id = request.params.id;
  //* Query the database
  let item = await databaseInstance.queryOne("SELECT items.id, items.quantity, items.name, items.price, items.date_added, items.for_sale, items.price, items.expiry_date, categories.id as categoryid, categories.name categoryName from items JOIN categories ON items.category = categories.id WHERE items.id="+id);

  console.log(item)
  if (item.error) {
    return response.send(item)
  }

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
    return response.send({error: "Couldn't delete item"});
  }
})

// Add a new item
router.post('/add', async (request, response) => {
  const name = request.body.name;
  const price = request.body.price;
  const expiry_date = request.body.expiry_date || null;
  const category = request.body.category;
  const quantity = request.body.quantity;
  const for_sale = request.body.for_sale == "on" ? true : false;
  console.log(request.body);
  // Add the value to the database
  try {
    let insertItemQuery;
    //insertItemQuery = `SELECT insert_item (${name}, ${price}, date ${expiry_date}, ${category}, ${for_sale}, ${quantity})`
    insertItemQuery = 'SELECT insert_item($1, $2, $3, $4, $5, $6)'

    const valuesList = [name, price, expiry_date, category, for_sale, quantity];

    const result = await databaseInstance.insertWithValues(insertItemQuery, valuesList)

    if (!result) {
      return response.send({error: "Item couldn't be added"});
    }
    console.log(result)

    return response.status(200).send({text: "Item added successfully"})
  } catch (e) {
    console.log(e.message);
    return response.status(404).send({error: "Item couldn't be added"})
  }

});

router.put('/edit/:id', async (request, response) => {
  const id = request.params.id;
  const name = request.body.name;
  const price = request.body.price;
  const expiry_date = request.body.expiry_date || null;
  const category = request.body.category;
  const quantity = request.body.quantity;
  const for_sale = request.body.for_sale;
  console.log(request.body);
  console.log(request.body.name);
  // Add the value to the database
  try {
    const updateItemQuery = `UPDATE items SET name=$1, price=$2, expiry_date=$3, category=$4, for_sale=$5, quantity=$6 WHERE id=$7`;

    const valuesList = [name, price, expiry_date, category, for_sale, quantity, id];


    const result = await databaseInstance.updateWithValues(updateItemQuery, valuesList);

    return response.send(result);
  } catch (e) {
    console.log(e.message);
    return response.send({error: "Couldn't edit item"})
  }
});

module.exports = router;