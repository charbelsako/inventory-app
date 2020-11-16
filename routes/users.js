const express = require("express");
const router = express.Router();

router.get('/', (request, response) => {
    response.send("hello from users") 
});

module.exports = router;
