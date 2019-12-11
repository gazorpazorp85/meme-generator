'use strict'

function init() {
    loadPictures();
    renderGallery();
    createCanvas();
}

function renderGallery() {
    let imgs = loadPictures();
    let strHtmls = imgs.map(function (img) {
        return `<div><img class="thumbnails" src="${img.url}" onclick="onToggleMemeEditor(${img.id})"/></div>`
    });
    document.querySelector('.gallery').innerHTML = strHtmls.join('');
}

function onToggleMemeEditor(imgId) {
    let elMemeEditor = document.querySelector('.meme-editor-container');
    elMemeEditor.classList.toggle('hidden');
    let elGallery = document.querySelector('.gallery');
    elGallery.classList.toggle('hidden');
    renderMemeEditor(imgId);
}

function onToggleGallery() {
    let elMemeEditor = document.querySelector('.meme-editor-container');
    elMemeEditor.classList.toggle('hidden');
    let elGallery = document.querySelector('.gallery');
    elGallery.classList.toggle('hidden');
    renderGallery();
}

function renderMemeEditor(imgId) {
    drawMeme(imgId);
}

function preventDefault(event) {
    event.preventDefault();
}

function onChangeText() {
    let elText = document.getElementById('text-top-line');
    let text = elText.value;
}

function onChangeFillColor() {
    let elfillColor = document.getElementById('fillcolor');
    let fillColor = elfillColor.value;
    changeFillColor(fillColor);
    let imgId = gCurrImg.id;
    drawMeme(imgId);
}

function onChangeBorderColor() {
    let elBorderColor = document.getElementById('bordercolor');
    let borderColor = elBorderColor.value;
}


