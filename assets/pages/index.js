

// Creacion de las Cards

const contenedorCardsId = document.getElementById('contenedorCards')

//Funcion para crear la card

function crearCard(image, title, tagline, overview) {
    const plantillaCard = `
    <div class="card">
                <img src="${image}" alt="">
                <div class="cardInfo">
                    <h3 class="tituloCard">${title}</h3>
                    <h4 class="taglineCard">${tagline}</h4>
                    <p class="descripcionCard">${overview}</p>

                </div>
    </div>
    `
    return plantillaCard
}

for (const movie of movies) {
    const { image, title, tagline, overview } = movie

    const card = crearCard(image, title, tagline, overview)

    contenedorCardsId.innerHTML += card
}


