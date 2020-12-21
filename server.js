/*global __dirname */
require('dotenv').config();

const express = require("express");
const app = express();
const path = require("path");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const itemRouter = require('./routes/items');
const cartRouter = require('./routes/cart');


const apiRouter = require('./routes/api');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/api/v1', apiRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/item', itemRouter);
app.use('/cart', cartRouter);

app.set('views', './views');
app.set('view engine', 'pug');

app.get('*', (req, res, next) => {
  res.status(404).send("Sorry page not found");
  next();
});

app.listen(PORT, () => {
  console.log(`app listening on https://localhost:${PORT}`);
});
