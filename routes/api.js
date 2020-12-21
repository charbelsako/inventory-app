const express = require('express');
const router = express.Router()

const itemsApi = require("./itemsApi");
const cartApi = require("./cartApi")

router.use('/item', itemsApi);
router.use('/cart', cartApi);

module.exports = router;