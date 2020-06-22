const express = require('express');
const router = express.Router();

const { Reserva_VentaControl } = require('../controller/reserva_venta');
const reserva_VentaControl = new Reserva_VentaControl();

const { SalaControl } = require('../controller/sala.control');
const salaControl = new SalaControl();

// Nueva Pelicula
router.get('/reservas/crear', (req, res) => {
    const salas = salaControl.getAll();
    return res.render('reserva_venta/nuevo/seleccionarSala', { salas });
});

router.post('/reservas/crear/seleccionarFila', (req, res) => {
    const { tipo, valor, idSala } = req.body;

    const sala = salaControl.getUno(Number(idSala));

    return res.render('reserva_venta/nuevo/seleccionarFila', {
        tipo,
        valor,
        idSala,
        sala: sala.numeroSala,
        filas: sala.sillas,
        pelicula: sala.pelicula,
        idPelicula: sala.idPelicula,
    });
});

router.post('/reservas/crear/seleccionarNumero', (req, res) => {
    const { tipo, valor, idSala, sala, fila, pelicula, idPelicula } = req.body;

    const buscarSala = salaControl.getNumeroSilla(Number(idSala), fila);

    console.log(buscarSala);

    return res.render('reserva_venta/nuevo/seleccionarNumero', {
        tipo,
        valor,
        idSala,
        sala,
        fila,
        pelicula,
        idPelicula,
        numeros: buscarSala,
    });
});

router.post('/reservas/crear', (req, res) => {
    reserva_VentaControl.crear(req.body);
    res.redirect('/reservas');
});
// Obtener todas las Reservas

router.get('/reservas', (req, res) => {
    const reserva_venta = reserva_VentaControl.getAll();
    return res.render('reserva_venta/all', {
        title: 'Reservas y Ventas',
        reserva_venta,
    });
});

// Editar Pelicula

router.get('/reservas/editar/:id', (req, res) => {
    const { id } = req.params;
    const reserva = reserva_VentaControl.getUno(Number(id));
    const salas = salaControl.getAll();

    res.render('reserva_venta/editar/seleccionarSala', { id, reserva, salas });
});

router.post('/reservas/editar/:id/seleccionarFila', (req, res) => {
    const { id } = req.params;
    const { tipo, valor, idSala } = req.body;

    const reserva = reserva_VentaControl.getUno(Number(id));
    const sala = salaControl.getUno(Number(idSala));

    return res.render('reserva_venta/editar/seleccionarFila', {
        id,
        tipo,
        valor,
        idSala,
        sala: sala.numeroSala,
        filas: sala.sillas,
        pelicula: sala.pelicula,
        idPelicula: sala.idPelicula,
        fila: reserva.silla.fila,
    });
});

router.post('/reservas/editar/:id/seleccionarNumero', (req, res) => {
    const { id } = req.params;
    const { tipo, valor, idSala, sala, fila, pelicula, idPelicula } = req.body;

    const numero = reserva_VentaControl.getUno(Number(id)).silla.numero;

    const buscarSala = salaControl.getNumeroSilla(Number(idSala), fila);

    return res.render('reserva_venta/editar/seleccionarNumero', {
        numero,
        id,
        tipo,
        valor,
        idSala,
        sala,
        fila,
        pelicula,
        idPelicula,
        numeros: buscarSala,
    });
});

router.post('/reservas/editar/:id', (req, res) => {
    const { id } = req.params;

    reserva_VentaControl.editar(Number(id), req.body);
    res.redirect('/reservas');
});

/* 
router.put('/peliculas/edit/:id', (req, res) => {
    const { id } = req.params;
    delete req.body._method;

    req.body.sala = salas.filter((sala) => sala.id == req.body.idSala)[0].numeroSala;

    peliculaControl.edit(Number(id), req.body);
    res.redirect('/peliculas');
}); */

// Delete Pelicula

router.delete('/reservas/delete/:id', (req, res) => {
    const { id } = req.params;
    reserva_VentaControl.eliminar(Number(id));
    res.redirect('/reservas');
});

module.exports = router;
