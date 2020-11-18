const express = require("express");
const router = express.Router();

router.get('/:name', (request, response) => {
    const options = {name: request.params.name}
    response.render("users.pug", options) 
});

module.exports = router;
