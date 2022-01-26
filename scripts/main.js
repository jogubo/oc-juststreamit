/// <reference lib='dom' />

///////////////////
// API Settings
///////////////////
const mainUrl = "http://10.0.0.147:8000/api/v1/titles/";

///////////////////
// Modal Box
///////////////////
const modalBox = document.getElementById("modalBox");
const btnClose = document.getElementById("btn-close");

btnClose.onclick = () => {
    modalBox.style.display = "none";
}

window.onclick = event => {
    if (event.target == modalBox) {
        modalBox.style.display = "none";
    }
}

///////////////////
// Best Movie
///////////////////
const btnMoreInfo = document.getElementById("btn-more-info");

function showPreviewBestMovie(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let movieData = data;
        let bestMovie = document.getElementById("bestMovie");
        let movieTitle = document.createElement("h2");
        let movieDescription = document.createElement("p");
        bestMovie.innerHTML = `<p><img src="${data.image_url}"></p>`
        movieTitle.innerText = movieData.title;
        movieDescription.innerText = movieData.description;
        bestMovie.appendChild(movieTitle)
        bestMovie.appendChild(movieDescription)
    })
}

function getBestMovie() {
    fetch(`${mainUrl}?sort_by=-imdb_score`)
    .then(response => response.json())
    .then(data => {
        let movieUrl = data.results[0].url
        console.log(movieUrl)
        showPreviewBestMovie(movieUrl)
    })
}

btnMoreInfo.onclick = () => {
    modalBox.style.display = "block";
}


///////////////////
// Carousel
///////////////////
const btnArrowLeft = document.getElementsByClassName("arrow-left");
const btnArrowRight = document.getElementsByClassName("arrow-right");

getBestMovie()
