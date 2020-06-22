// Logica para el control de cajeros y clientes
const fs = require('fs');
const path = require('path');
const { SalaControl } = require('./sala.control');
const salaControl = new SalaControl();

class Reserva_VentaControl {
    constructor() {
        this.reserva_venta = [];

        let data = require('../data/reserva_venta.json');
        data.reserva_venta.forEach((item) => this.reserva_venta.push(item));
    }

    crear(reserva = { id, tipo, valor, idSala, sala, silla, pelicula, idPelicula }) {
        reserva.id = Date.now();
        const dataTransformada = this.transformData(reserva.valor, reserva.idSala, reserva.silla);

        (reserva.valor = dataTransformada.valor),
            (reserva.idSala = dataTransformada.idSala),
            (reserva.silla = dataTransformada.silla);

        this.reserva_venta.push(reserva);
        console.log(this.reserva_venta);

        salaControl.actualizarSilla(reserva.idSala, reserva.silla);
        this.actualizarArchivo();
        return;
    }
    getAll() {
        return this.reserva_venta;
    }
    getUno(id = Number) {
        return this.reserva_venta.filter((reserva) => reserva.id === id)[0];
    }
    editar(id = Number, dataReserva) {
        const dataTransformada = this.transformData(dataReserva.valor, dataReserva.idSala, dataReserva.silla);
        (dataReserva.valor = dataTransformada.valor),
            (dataReserva.idSala = dataTransformada.idSala),
            (dataReserva.silla = dataTransformada.silla);
        this.reserva_venta = this.reserva_venta.map((reserva) => {
            if (reserva.id === id) {
                reserva = dataReserva;
                salaControl.actualizarSilla(reserva.idSala, reserva.silla);
            }
            return reserva;
        });
        this.actualizarArchivo();
    }

    eliminar(id = Number) {
        this.reserva_venta = this.reserva_venta.filter((reserva) => reserva.id !== id);
        this.actualizarArchivo();
    }

    transformData(valor, idSala, silla) {
        /* 
            transformar fila al formato "silla": { "fila": "a", "numero": 1 },
        */
        valor = Number(valor);
        idSala = Number(idSala);
        silla = { fila: silla[0], numero: Number(silla[1]) };

        return { valor, idSala, silla };
    }

    actualizarArchivo() {
        const jsonData = {
            reserva_venta: this.reserva_venta,
        };
        const saveData = JSON.stringify(jsonData);
        fs.writeFileSync(path.join(__dirname, '../data/reserva_venta.json'), saveData);
    }
}

module.exports = { Reserva_VentaControl };
