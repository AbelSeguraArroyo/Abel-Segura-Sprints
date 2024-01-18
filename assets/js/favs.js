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
console.log(listaPeliculas(movies))
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

            let card = ''
            if (favorites.length == 0) {
                contenedorCards.appendChild(crearCard('No hay películas guardadas'))
            } else {
                for (const movie of movies) {
                    let { image, title, tagline, overview, id } = movie

                    card += crearCard(image, title, tagline, overview, id)

        
                
                }

                
            }
            return card
        }

        function crearCard(image, title, tagline, overview, id) {
            const favorites = JSON.parse(localStorage.getItem("favorites")) || []

            const fav = favorites.includes(id)

            const plantillaCard = `
        <div class="card">
                    <img src="https://moviestack.onrender.com/static/${image}" alt="">
                    <div class="cardInfo">
                        <h3 class="tituloCard">${title}</h3>
                        <h4 class="taglineCard">${tagline}</h4>
                        <p class="descripcionCard">${overview}</p>
                        <div>
                        <button class='btnFavorite2' data-id="${id}" > Favorito </button>
                        <a class='button' href='./movieInfo.html?id=${id}'>info</a>
                        </div>
    
                    </div>
        </div>
        `   
        
            if (fav) {
                return plantillaCard
            }else{
                return ''
            }

        }
    })
    .catch((e) => console.error(e))
