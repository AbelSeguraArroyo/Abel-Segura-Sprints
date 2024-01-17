const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
const handleId = location.search
const id = new URLSearchParams(handleId).get('id')

const $contenedorInfo = document.getElementById('contenedorInfo')
const $title = document.querySelector('title')

fetch


fetch("https://moviestack.onrender.com/api/movies", {
    headers: {
        "X-API-Key": apiKey,
    },
})
    .then((response) => response.json())
    .then((data) => {
        const movie = data.movies.find((movie) => movie.id == id)

        let calificacion = movie.vote_average.toFixed(2);

    $contenedorInfo.innerHTML = listaPeliculas(movie);

    let titulo = movie.title;
    $title.innerHTML = titulo;
    

    function crearInfo(image, title, tagline, genres, overview, original_language, release_date, runtime, status, vote_average, budget, revenue) {
        const plantillaInfo = `
        <div class='information'>
            <img src='https://moviestack.onrender.com/static/${image}' alt=''>
            <div class='movieInfo'>
            <h2>${title}</h2>
            <h3>${tagline}</h3>
            <h4>${genres}</h4>
            <p>${overview}</p>
            </div>
        </div>
        <div class='tables'>
            <table border="1">
            <tr>
            <th>Original_language</th>
            <th>Release_date</th>
            <th>Runtime</th>
            <th>Status</th>
            </tr>
            <tr>
            <td>${original_language}</td>
            <td>${release_date}</td>
            <td>${runtime}</td>
            <td>${status}</td>
            </tr>
        </table>
    
        <table border="1">
            <tr>
            <th>Vote Average</th>
            <th>Budget</th>
            <th>Revenue</th>
            </tr>
            <tr>
            <td>${vote_average}</td>
            <td>USD ${budget}</td>
            <td>USD ${revenue}</td>
            </tr>
        </table>
        </div>
    
        `
        return plantillaInfo
    }
    
    function informacionMovies(movie) {
        contenedorInfo.innerHTML = crearInfo(
            movie.image,
            movie.title,
            movie.tagline,
            movie.genres,
            movie.overview,
            movie.original_language,
            movie.release_date,
            movie.runtime,
            movie.status,
            movie.vote_average,
            movie.budget,
            movie.revenue
        )
    }
    
    function listaPeliculas(movie){
        let carta = crearInfo(movie.image, movie.title, movie.tagline, movie.genres, movie.overview, movie.original_language, movie.release_date, movie.runtime, movie.status, movie.vote_average, movie.budget, movie.revenue)
        return carta
    }
})
.catch((e) => console.error(e))


