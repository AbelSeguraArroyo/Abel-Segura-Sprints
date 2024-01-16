const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"

const $contenedorCards = document.getElementById('contenedorCards')

const $selectGenre = document.getElementById('selectGenre')

const $inputName = document.getElementById('inputName')

let movies = [];

fetch("https://moviestack.onrender.com/api/movies", {
  headers: {
    "X-API-Key": apiKey,
  },
})

