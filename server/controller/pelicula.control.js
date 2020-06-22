// Logica para el control de cajeros y clientes
const fs = require('fs');
const path = require('path');
const { SalaControl } = require('./sala.control');

const salaControl = new SalaControl();
class PeliculaControl {
    constructor() {
        this.peliculas = [];

        let data = require('../data/Pelicula.json');
        data.peliculas.forEach((item) => this.peliculas.push(item));
    }

    crear(Pelicula = { nombre, idSala, sala, descripcion }) {
        Pelicula.id = Date.now();
        this.peliculas.push({ ...Pelicula });
        salaControl.actualizarPelicula(Pelicula.idSala, Pelicula.id, Pelicula.nombre);
        this.actualizarArchivo();
    }
    getAll() {
        return this.peliculas;
    }
    getUno(id = Number) {
        return this.peliculas.filter((pelicula) => pelicula.id === id)[0];
    }
    edit(id = Number, dataPelicula) {
        this.peliculas = this.peliculas.map((pelicula) => {
            if (pelicula.id === id) {
                pelicula = dataPelicula;
            }
            return pelicula;
        });
        this.actualizarArchivo();
    }

    eliminar(id = Number) {
        this.peliculas = this.peliculas.filter((cajero) => cajero.id !== id);
        this.actualizarArchivo();
    }

    actualizarArchivo() {
        const jsonData = {
            peliculas: this.peliculas,
        };
        const saveData = JSON.stringify(jsonData);
        fs.writeFileSync(path.join(__dirname, '../data/Pelicula.json'), saveData);
    }
}

module.exports = { PeliculaControl };
