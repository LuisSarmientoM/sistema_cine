const express = require('express');
const app = express();

app.get('/', (req, res) => res.redirect('/cajero'));

app.use(require('./cajero_cliente'));

module.exports = app;
