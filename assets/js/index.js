
const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"

fetch("https://moviestack.onrender.com/api/movies", {
    method: 'GET',
    headers: {
        "X-API-Key": apiKey,
    },
}).then((response) => response.json())
    .then((data) => {

        const movies = data.movies
        

        const contenedorCards = document.getElementById('contenedorCards')

        contenedorCards.addEventListener('click', (e) => {
            console.log('hola')
            if(e.target.dataset.id != undefined){
                console.log('chau')
                listaPeliculas(movies)
                marcarFavorite(e.target.dataset.id, e)
            }
            listaPeliculas(movies)
        })


        //Funcion para crear la card

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
            } else {
                return `
        <div class="card">
        <img src="https://moviestack.onrender.com/static/${image}" alt="">
        <div class="cardInfo">
            <h3 class="tituloCard">${title}</h3>
            <h4 class="taglineCard">${tagline}</h4>
            <p class="descripcionCard">${overview}</p>
            <div>
            <button class='btnFavorite2' data-id="${id}" > No Favorito </button>
            <a class='button' href='./movieInfo.html?id=${id}'>info</a>
            </div>

        </div>
</div>
`
            }
        }

        const favorites = JSON.parse(localStorage.getItem('favorites')) || []
        function marcarFavorite(movieId, eTarget) {
            const index = favorites.indexOf(movieId);
            console.log(eTarget);
            if (index == -1) {


                favorites.push(movieId);
                localStorage.setItem("favorites", JSON.stringify(favorites));
            } else {


                favorites.splice(index, 1);
                localStorage.setItem("favorites", JSON.stringify(favorites));
            }


            localStorage.setItem("favorites", JSON.stringify(favorites));

            filtros()

        }
            function listaPeliculas(movies) {
                contenedorCards.innerHTML = ''
                for (const movie of movies) {
                    const { image, title, tagline, overview, id } = movie

                    const card = crearCard(image, title, tagline, overview, id)

                    contenedorCards.innerHTML += card
                }
            }

            listaPeliculas(movies)

            const selectGenre = document.getElementById('selectGenre')

            const inputName = document.getElementById('inputName')
            

            function byName(movies, name) {
                const filtered = []
                console.log(name)
                for (let movie of movies) {
                    if (movie.title.toLowerCase().includes(name.toLowerCase())) {
                        filtered.push(movie)
                    }
                }
                return filtered
            }

            function byGenre(names) {
                let genreSearch = selectGenre.options[selectGenre.selectedIndex].value

                const filtered = []
                if (genreSearch == 'All') {
                    return names
                } else {
                    for (let movie of names) {
                        if (movie.genres.includes(genreSearch)) {
                            filtered.push(movie)
                        }
                    }
                }
                return filtered

            }

            function filtros(){
                const filtroNombre = byName(movies, inputName.value)
                const filtroGenero = byGenre(movies)
                const filtrado = filtroNombre.filter((movie) => filtroGenero.includes(movie))
                if(filtrado != 0){
                    listaPeliculas(filtrado);
                }
            }

            inputName.addEventListener('input', function () {
                const filterByName = byName(movies, inputName.value)
                const filterByGenre = byGenre(filterByName)
                console.log(filterByGenre)

                if (filterByGenre.lenght == 0) {
                    contenedorCards.innerHTML = `<h3>No Match</h3>`
                } else {
                    listaPeliculas(filterByGenre)
                }
            })

            selectGenre.addEventListener('change', function () {
                const filterByName = byName(movies, inputName.value)
                const filterByGenre = byGenre(filterByName)
                console.log(filterByGenre)
                if (filterByGenre.lenght == 0) {
                    contenedorCards.innerHTML = `<h3>No Match</h3>`
                } else {
                    listaPeliculas(filterByGenre)
                }
            })

            const genres = movies.map((movie) => movie.genres)

            const newFlatGenres = genres.flat()
            console.log(newFlatGenres)


            function filteredGenres(genres) {
                const newGenres = []
                for (let genre of genres) {
                    if (newGenres.includes(genre) == false) {
                        newGenres.push(genre)
                    }
                }
                return newGenres.sort()
            }

            function addOptions(option) {
                return `<option value='${option}'>${option}</option>`
            }
            console.log(filteredGenres(newFlatGenres))

            function completeOptions(options) {
                let add = ''
                for (let option of options) {
                    add += addOptions(option)
                }
                return add
            }

            selectGenre.innerHTML += completeOptions(filteredGenres(newFlatGenres))

        }
    )

    .catch((e) => console.error(e))
