const express = require('express');
const router = express.Router();

const { PeliculaControl } = require('../controller/pelicula.control');
const { SalaControl } = require('../controller/sala.control');
const peliculaControl = new PeliculaControl();
const salaControl = new SalaControl();

// Nueva Pelicula
router.get('/peliculas/crear', (req, res) => {
    const salas = salaControl.getAll();
    return res.render('peliculas/nuevo', { salas });
});

router.post('/peliculas/crear', (req, res) => {
    const salas = salaControl.getAll();
    req.body.idSala = Number(req.body.idSala);
    req.body.sala = salas.filter((sala) => sala.id == req.body.idSala)[0].numeroSala;

    peliculaControl.crear(req.body);
    return res.redirect('/peliculas');
});

// Obtener todos las Peliculas

router.get('/peliculas', (req, res) => {
    const peliculas = peliculaControl.getAll();

    return res.render('peliculas/all', {
        title: 'Salas',
        peliculas,
    });
});

// Editar Pelicula

router.get('/peliculas/edit/:id', (req, res) => {
    const { id } = req.params;
    const pelicula = peliculaControl.getUno(Number(id));

    res.render('peliculas/edit', { ...pelicula, salas });
});

router.put('/peliculas/edit/:id', (req, res) => {
    const { id } = req.params;
    const salas = salaControl.getAll();

    delete req.body._method;

    req.body.sala = salas.filter((sala) => sala.id == req.body.idSala)[0].numeroSala;

    peliculaControl.edit(Number(id), req.body);
    res.redirect('/peliculas');
});

// Delete Pelicula

router.delete('/peliculas/delete/:id', (req, res) => {
    const { id } = req.params;
    peliculaControl.eliminar(Number(id));
    res.redirect('/peliculas');
});

module.exports = router;
