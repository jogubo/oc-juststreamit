/// <reference lib='dom' />

// API Settings
const mainUrl = "http://10.0.0.147:8000/api/v1/titles/";

// Elements
const btnMoreInfo = document.getElementById("btn-more-info");
const btnArrowLeft = document.getElementsByClassName("arrow-left");
const btnArrowRight = document.getElementsByClassName("arrow-right");
const btnClose = document.getElementById("btn-close");
const modalBox = document.getElementById("modalBox");

// Modal Box
btnMoreInfo.onclick = function() {
    modalBox.style.display = "block";
}

btnClose.onclick = function() {
    modalBox.style.display = "none";
}
