const express = require('express');
const router = express.Router();

const { CajeroClienteControl } = require('../controller/cajero_cliente.control');
const cajeroClienteControl = new CajeroClienteControl();

// Nuevo cliente o Cajero

router.get('/cajero/crear', (req, res) => {
    res.render('cajero_cliente/nuevo');
});
router.post('/cajero/crear', (req, res) => {
    const { identificacion, nombre, apellido } = req.body;
    cajeroClienteControl.crear({ identificacion, nombre, apellido });
    res.redirect('/cajero');
});

// Obtener todos los usuarios o clientes

router.get('/cajero', (req, res) => {
    const cajeros = cajeroClienteControl.getAll();

    res.render('cajero_cliente/all', {
        title: 'Cajero y Clientes',
        cajeros,
    });
});

// Editar cliente o Cajero

router.get('/cajero/edit/:id', async (req, res) => {
    const { id } = req.params;
    const cajero = await cajeroClienteControl.getUno(Number(id));

    res.render('cajero_cliente/edit', { ...cajero });
});

router.put('/cajero/edit/:id', (req, res) => {
    const { id } = req.params;
    const { identificacion, nombre, apellido } = req.body;

    cajeroClienteControl.edit(Number(id), { id: Number(id), identificacion, nombre, apellido });
    res.redirect('/cajero');
});

// Delete Cajero

router.delete('/cajero/delete/:id', (req, res) => {
    const { id } = req.params;
    cajeroClienteControl.eliminar(Number(id));
    res.redirect('/cajero');
});

module.exports = router;
