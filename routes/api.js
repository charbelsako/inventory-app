const express = require('express');
const router = express.Router()

const itemsApi = require("./itemsApi");

router.use('/item', itemsApi);
// router.use('/item', itemsApi);

module.exports = router;