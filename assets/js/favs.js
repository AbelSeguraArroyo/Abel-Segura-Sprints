const favs = localStorage.getItem("favorites");
console.log(favs)

const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";

const $favsContainer = document.getElementById("contenedorCards");

import { marcarFavorite, crearCard } from "./functions.js";

fetch("https://moviestack.onrender.com/api/movies", {
    headers: {
        "X-API-Key": apiKey,
    },
})
    .then((response) => response.json())
    .then((data) => {
        const movies = data.movies.filter((movie) =>
            favs.includes(movie.id)
        );
        $favsContainer.innerHTML = listaPeliculas(movies)

    console.log(movies)

    $favsContainer.addEventListener("click", (e) => {
            console.log(e.target.dataset.id)
            if (e.target.dataset.id != undefined) {
                $favsContainer.innerHTML = listaPeliculas(movies)
                marcarFavorite(e.target.dataset.id, e.target)
            }
            $favsContainer.innerHTML = listaPeliculas(movies)

        })

        function listaPeliculas(movies) {
            const favorites = JSON.parse(localStorage.getItem("favorites")) || []
            contenedorCards.innerHTML = ''
            if (favorites.length == 0) {
                contenedorCards.appendChild(crearCard('No hay películas guardadas'))
            } else {
                for (const movie of movies) {
                    const { image, title, tagline, overview, id } = movie

                    const card = crearCard(image, title, tagline, overview, id)

                    contenedorCards.innerHTML += card
                }
            }
            return card
        }
    })
    .catch((e) => console.error(e))
