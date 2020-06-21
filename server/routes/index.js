const express = require('express');
const app = express();

app.get('/', (req, res) => res.redirect('/cajero'));

app.use(require('./cajero_cliente'));
app.use(require('./sala'));

module.exports = app;
