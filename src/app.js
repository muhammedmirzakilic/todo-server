require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./config');
const PORT = config.port;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const db = require('./db');

db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch(err => {
    console.log('Failed to sync db: ' + err.message);
  });

app.get('/', (req, res) => {
  res.send({ status: 'working!' });
});

app.listen(PORT, function () {
  console.log('Server started');
});
