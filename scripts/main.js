/// <reference lib='dom' />

///////////////////
// API Settings
///////////////////
const mainUrl = "http://10.0.0.147:8000/api/v1/titles/";


///////////////////
// Modal Box
///////////////////
function createModal(movieId) {
    fetch(`${mainUrl}${movieId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("movie-info").innerHTML = `
            <h2 style="text-align: center">${data.title}</h2>
            <p style="text-align: center"><img src="${data.image_url}"></p>
            <p><strong>Genre:</strong> ${data.genres}</p>
            <p><strong>Date de sortie:</strong> ${data.date_published}</p>
            <p><strong>Score IMDb:</strong> ${data.imdb_score}</p>
            <p><strong>Réalisateur(s):</strong> ${data.directors}</p>
            <p><strong>Acteurs:</strong> ${data.actors}</p>
            <p><strong>Durée:</strong> ${data.duration} minutes</p>
            <p><strong>Pays:</strong> ${data.countries}</p>
            <p><strong>Synopsis:</strong> ${data.long_description}</p>
        `;
        const btnClose = document.getElementById("btn-close");
        const modalBox = document.getElementById("modal-box");
        modalBox.style.display = "block";
        btnClose.onclick = () => {modalBox.style.display = "none"};
        window.onclick = event => {
            if (event.target == modalBox) {
                modalBox.style.display = "none";
            }
        }
    })
    .catch(error => console.log(error))
};


///////////////////
// Best Movie
///////////////////
function showPreviewBestMovie(movieId) {
    fetch(`${mainUrl}${movieId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("best-movie").innerHTML = `
            <p style="text-align: center"><img src="${data.image_url}"></p>
            <p style="text-align: center"><strong>${data.title}</strong></p>
            <p>${data.description}</p>
        `;
    })
    .catch(error => console.log(error))
};

function getBestMovie() {
    fetch(`${mainUrl}?sort_by=-imdb_score`)
    .then(response => response.json())
    .then(data => {
        const btnMoreInfo = document.getElementById("btn-more-info");
        let movieId = data.results[0].id;
        showPreviewBestMovie(movieId);
        btnMoreInfo.onclick = () => createModal(movieId);
    })
    .catch(error => console.log(error))
};


///////////////////
// Carousel
///////////////////
const btnArrowLeft = document.getElementsByClassName("arrow-left");
const btnArrowRight = document.getElementsByClassName("arrow-right");

function createCarousel(category) {
    let page = 1
    while (page < 3) {
        fetch(`
            ${mainUrl}?genre_contains=${category}
            &sort_by=-imdb_score&page=${page}
            `)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (let movie of data.results) {
                console.log(movie.id)
            }
        })
        .catch(error => console.log(error));
        page++
    }
}


///////////////////
// Run
///////////////////
function main() {
    getBestMovie()
    createCarousel("action")
};

main();
