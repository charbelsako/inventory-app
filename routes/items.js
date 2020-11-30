const express = require("express");
const router = express.Router();
const database = require("../database");
const databaseInstance = new database('pg');
const axios = require("axios");

// render all items
router.get('/', async (request, response) => {
  const data =
  axios
    .get('/api/v1/item')
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