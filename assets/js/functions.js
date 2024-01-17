export function crearCard(movie) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const fav = favorites.includes(movie.id);
  if (fav) {
    return `
    <div class="card">
                <img src="https://moviestack.onrender.com/static/${image}" alt="">
                <div class="cardInfo">
                    <h3 class="tituloCard">${title}</h3>
                    <h4 class="taglineCard">${tagline}</h4>
                    <p class="descripcionCard">${overview}</p>
                    <div>
                    <button class='btnFavorite2' data-id="${movie.id}" > Favorito </button>
                    <a class='button' href='./movieInfo.html?id=${id}'>info</a>
                    </div>

                </div>
    </div>
    `;
  } else {
    return `
          `;
  }
}

export function marcarFavorite(movieId, eTarget) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
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
}
