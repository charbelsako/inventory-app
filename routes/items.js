const express = require("express");
const router = express.Router();
const database = require("../database");
const databaseInstance = new database('pg');
const axios = require("axios");

// TODO: This should probably be in index.js
// render all items
router.get('/', async (request, response) => {
  const data =
  axios
    .get('/api/v1/item/all')
    .then(function(response) {console.log(response)})

  return response.render("items", data)
});

// Add a new item
router.get("/add", async (request, response) => {
  const categories = await databaseInstance.query("SELECT id, name FROM categories ORDER BY id;");

  const data = {
    categories
  };

  return response.render("additem", data);
});
// router.post('/add', async (request, response) => {
//   const name = request.body.name;
//   const price = request.body.price;
//   const expiry_date = request.body.expiry_date || null;
//   const category = request.body.category;
//   const quantity = request.body.quantity
//   const for_sale = request.body.for_sale == "on" ? true : false;
//   console.log(request.body)
//   // Add the value to the database
//   try {
//     const insertItemQuery = `INSERT INTO items (name, price, expiry_date, category, for_sale, quantity) VALUES ('${name}', ${price}, ${expiry_date}, ${category}, ${for_sale}, ${quantity})`

//     await databaseInstance.insert(insertItemQuery)

//     return response.redirect('/')
//   } catch (e) {
//     console.log(e.message);
//   }

// });

// Delete an item
// router.delete('/delete/:id', async (request, response) => {
//   const id = request.params.id;
//   try{
//     const deleteQuery = `DELETE FROM items WHERE id = ${id}`;

//     await databaseInstance.query(deleteQuery);

//     return response.send("Item deleted successfully");
//   } catch(e) {
//     console.log(e)
//     return response.send(e.message);
//   }
// })

router.get('/edit/:id', async (request, response) => {
  const id = request.params.id;
  try{
    const data = await axios.get(`http://localhost:3000/api/v1/item/${id}`)
    console.log(data.data);
    if (data.data.error) {
      console.log("error")
      return response.render("edititem", {error: data.data.error})
    }
    const { item }  = data.data;
    const categories = await databaseInstance.query("SELECT id, name FROM categories ORDER BY id;");
    response.render("edititem", {item, categories})
  }catch(e) {
    console.log(e)
    response.send("An error occurred");
  }

});

module.exports = router;