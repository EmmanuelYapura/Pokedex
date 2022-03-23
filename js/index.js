console.log(document.querySelector('title').textContent)

let idPokemon = 1

document.addEventListener("DOMContentLoaded", () => {
    getFetch(idPokemon)
})

const $img = document.getElementById('foto-pokemon')
const textos = document.querySelectorAll('p')

async function getFetch(id) {
    try {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        let pokemon = await res.json()
        completarDatos(pokemon)
    } catch (error) {
        console.error(error)
    }
}

const arriba = document.getElementById('arriba')
const abajo = document.getElementById('abajo')

function cargarEventosDeImagen(imagenes) {
    arriba.addEventListener('click', () => {
        $img.src = imagenes.front_default
    })
    abajo.addEventListener('click', () => {
        $img.src = imagenes.back_default
    })
}

function completarDatos(pokemon) {
    textos[0].innerText = `Name: ${pokemon.name}`
    textos[1].innerText = `Height: ${pokemon.height}`
    textos[2].innerText = `Weight: ${pokemon.weight}`

    $img.src = pokemon.sprites.front_default
    cargarEventosDeImagen(pokemon.sprites)

    textos[3].innerText = `Hp: ${pokemon.stats[0].base_stat}`
    textos[4].innerText = `Attack: ${pokemon.stats[1].base_stat}`
    textos[5].innerText = `Defense: ${pokemon.stats[2].base_stat}`
}

const siguiente = document.getElementById('adelante')
siguiente.addEventListener('click', () => {
    idPokemon == 150 ? console.log('No hay mas pokemones (MaximoID 150)') : getFetch(++idPokemon)
})

const anterior = document.getElementById('atras')
anterior.addEventListener('click', () => {
    idPokemon == 1 ? console.log('No hay pokemones anteriores (MinimoID 1)') : getFetch(--idPokemon)
})


const input = document.querySelector('input')
const btnBuscar = document.getElementById('buscar')
let validarId = /^([1-9]|[1-9][0-9]|[1][0-4][0-9]|150)$/

function desactivarBoton(){
    btnBuscar.style.backgroundColor = 'red'
    btnBuscar.disabled = true
}

function activarBoton(){
    btnBuscar.style.backgroundColor = 'black'
    btnBuscar.disabled = false
}

input.addEventListener('input', () => {
    if (input.value == 0) {
        console.log('No existe un pokemon con ID cero')
        desactivarBoton()
    } else if (!validarId.test(input.value)) {
        console.log('El ID ingresado no existe')
        desactivarBoton()
    } else {
        activarBoton()
    }
})

btnBuscar.addEventListener('click', () => {
    idPokemon = input.value
    getFetch(idPokemon)
    limpiarInput()
    desactivarBoton()
})

function limpiarInput(){
    input.value = ''
}

