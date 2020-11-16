/*global __dirname*/
require('dotenv').config();

const express = require("express");
const app = express();
const path = require("path");

// postgresql setup
const { Client } = require("pg");
const client = new Client();
client.connect();

/*
client
  .query('SELECT NOW() as now')
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))
*/

const PORT = 3000;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
	console.log(`app listening on https://localhost:${PORT}`);
})
