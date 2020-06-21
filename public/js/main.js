const numeroSala = document.getElementById('fila');
const optionsSala = document.getElementById('sala');
function agregarFila() {
    const fila = document.createElement('div');
    fila.setAttribute('class', 'form-group');
    fila.addEventListener('input', function () {
        setID(this);
    });
    fila.innerHTML = `
    <label >Fila</label>
    <input class="form-control" type="text" name="">
    
    <label ># sillas</label>
    <input class="form-control" type="number" name="numero" value="0">
    `;

    numeroSala.appendChild(fila);
}

function setID(event = document) {
    let id = event.getElementsByTagName('input')[0].value;

    event.getElementsByTagName('input')[0].setAttribute('name', id);
    event.getElementsByTagName('input')[1].setAttribute('name', id);
}
