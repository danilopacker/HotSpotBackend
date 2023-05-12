const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');

const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000, console.log('Server started at localhost:3000'));
