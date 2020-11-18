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


module.exports = router;
