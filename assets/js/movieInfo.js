const handleId = location.search
const id = new URLSearchParams(handleId).get('id')

const movie = movies.find((movie) => movie.id == id)

const contenedorInfo = document.getElementById('contenedorInfo')

function crearInfo(image, title, tagline, genres, overview, original_language, release_date, runtime, status, vote_average, budget, revenue) {
    const plantillaInfo = `
    <div class='information'>
        <img src='${image}' alt=''>
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

informacionMovies(movie);

