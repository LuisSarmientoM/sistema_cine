const express = require('express');
const router = express.Router();

const { SalaControl } = require('../controller/sala.control');
const salaControl = new SalaControl();

// Nueva sala
router.get('/salas/crear', (req, res) => {
    return res.render('salas/nuevo');
});

router.post('/salas/crear', (req, res) => {
    salaControl.guardar(req.body);
    return res.redirect('/salas');
});

// Obtener todos las Salas

router.get('/salas', (req, res) => {
    const salas = salaControl.getAll();

    return res.render('salas/all', {
        title: 'Salas',
        salas,
    });
});

// Editar cliente o Cajero

router.get('/salas/edit/:id', (req, res) => {
    const { id } = req.params;
    const sala = salaControl.getUno(Number(id));
    res.render('salas/edit', { ...sala });
});

router.put('/salas/edit/:id', (req, res) => {
    const { id } = req.params;
    delete req.body._method;

    salaControl.edit(Number(id), req.body);
    res.send('/cajero');
    // res.redirect('/cajero');
});

// Delete Cajero

router.delete('/salas/delete/:id', (req, res) => {
    const { id } = req.params;
    salaControl.eliminar(Number(id));
    res.redirect('/salas');
});

module.exports = router;
