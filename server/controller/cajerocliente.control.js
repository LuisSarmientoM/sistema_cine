// Logica para el control de cajeros y clientes
const fs = require('fs');
const path = require('path');
class CajeroClienteControl {
    constructor() {
        this.cajeros = [];

        let data = require('../data/Cajero_Cliente.json');
        data.cajero_cliente.forEach((item) => this.cajeros.push(item));
    }

    crear(cajero = { identificacion, nombre, apellido }) {
        this.cajeros.push({ id: this.cajeros.length + 1, ...cajero });
        this.actualizarArchivo();
    }
    getAll() {
        return this.cajeros;
    }
    getUno(id = Number) {
        return this.cajeros.filter((cajero) => cajero.id === id)[0];
    }
    edit(id = Number, dataCajero = { identificacion, nombre, apellido }) {
        this.cajeros = this.cajeros.map((cajero) => {
            if (cajero.id === id) {
                cajero = dataCajero;
            }
            return cajero;
        });
        this.actualizarArchivo();
    }

    eliminar(id = Number) {
        this.cajeros = this.cajeros.filter((cajero) => cajero.id !== id);

        this.actualizarArchivo();
    }

    actualizarArchivo() {
        const jsonData = {
            cajero_cliente: this.cajeros,
        };
        const saveData = JSON.stringify(jsonData);
        fs.writeFileSync(path.join(__dirname, '../data/Cajero_Cliente.json'), saveData);
    }
}

module.exports = {
    CajeroClienteControl,
};
