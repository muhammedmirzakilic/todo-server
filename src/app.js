require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');
const config = require('./config');

const PORT = config.port;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const repository = require('./repository');

repository.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch(err => {
    console.log('Failed to sync db: ' + err.message);
  });
var corsOptions = {
  origin: '*',
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/auth', routes.authRoutes);
app.use('/todo', routes.todoRoutes);
app.get('/', (req, res) => {
  res.send({ status: 'working!' });
});

app.listen(PORT, function () {
  console.log('Server started');
});
