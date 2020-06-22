const fs = require('fs');
const path = require('path');

class SalaControl {
    constructor() {
        this.salas = [];

        const data = require('../data/Sala.json');
        data.salas.forEach((item) => this.salas.push(item));
    }

    guardar(salas) {
        const { numeroSala, numeroSillas, sillas } = this.transformData(salas);

        this.salas.push({
            id: Date.now(),
            numeroSala,
            pelicula: '',
            numeroSillas,
            sillas,
        });

        this.actualizarArchivo();
    }

    getAll() {
        return this.salas;
    }

    getUno(id = Number) {
        return this.salas.filter((sala) => sala.id === id)[0];
    }

    getNumeroSilla(id, fila) {
        return this.salas
            .filter((sala) => sala.id === id)[0]
            .sillas.filter((numero) => numero.fila === fila)[0]
            .numeros.filter((numero) => numero.ocupada !== true);
    }

    actualizarSilla(id, silla) {
        this.getUno(id)
            .sillas.filter((numeros) => numeros.fila === silla.fila)[0]
            .numeros.filter((numero) => numero.numero === silla.numero)[0].ocupada = true;

        this.actualizarArchivo();
    }

    edit(id = Number, dataSala) {
        const { numeroSala, numeroSillas, sillas } = this.transformData(dataSala);

        this.salas = this.salas.map((sala) => {
            if (sala.id === id) {
                sala = {
                    id,
                    numeroSala,
                    pelicula: '',
                    numeroSillas,
                    sillas,
                };
            }
            return sala;
        });
        // this.actualizarArchivo();
    }

    eliminar(id = Number) {
        this.salas = this.salas.filter((sala) => sala.id !== id);

        this.actualizarArchivo();
    }

    transformData(salas) {
        var numeroSala;
        var sillas = [];
        var numeroSillas = 0;
        for (let sala in salas) {
            if (sala == 'numeroSala') {
                numeroSala = salas[sala];
            } else if (sala == '_method') {
                continue;
            } else {
                sillas.push({
                    numeroSillas: salas[sala][1],
                    fila: sala,
                    numeros: retornaSilla(salas[sala]),
                });
            }
        }
        function retornaSilla(salas) {
            let numeroOcupado = [];
            for (let i = 0; i < salas[1]; i++) {
                numeroSillas += 1;
                numeroOcupado.push({ numero: i + 1, ocupada: false });
            }
            return numeroOcupado;
        }
        return {
            numeroSala,
            pelicula: '',
            numeroSillas,
            sillas,
        };
    }
    actualizarArchivo() {
        const jsonData = {
            salas: this.salas,
        };
        const saveData = JSON.stringify(jsonData);
        fs.writeFileSync(path.join(__dirname, '../data/Sala.json'), saveData);
    }
}

module.exports = { SalaControl };
