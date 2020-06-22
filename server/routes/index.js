const express = require('express');
const app = express();

app.get('/', (req, res) => res.redirect('/cajero'));

app.use(require('./cajero_cliente'));
app.use(require('./sala'));
app.use(require('./pelicula'));
app.use(require('./reserva_venta'));

module.exports = app;
