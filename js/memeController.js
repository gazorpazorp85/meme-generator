'use strict'

function init() {
    loadPictures();
    renderGallery();
    createCanvas();
}

function renderGallery() {
    let imgs = loadPictures();
    let strHtmls = imgs.map(function (img) {
        return `<img class="thumbnails" src="${img.url}" onclick="onToggleMemeEditor(${img.id})"/>`
    });
    document.querySelector('.gallery').innerHTML = strHtmls.join('');
}

function onToggleMemeEditor(imgId) {
    let elMemeEditor = document.querySelector('.meme-editor-container');
    elMemeEditor.classList.toggle('hidden');
    let elGallery = document.querySelector('.gallery');
    elGallery.classList.toggle('hidden');
    elGallery.classList.toggle('flex');
    renderMemeEditor(imgId);
}

function onToggleGallery() {
    let elMemeEditor = document.querySelector('.meme-editor-container');
    elMemeEditor.classList.toggle('hidden');
    let elGallery = document.querySelector('.gallery');
    elGallery.classList.toggle('hidden');
    elGallery.classList.toggle('flex');
    renderGallery();
}

function renderMemeEditor(imgId) {
    drawMeme(imgId);
}

function preventDefault(event) {
    event.preventDefault();
}

function onChangeText(text) {
    changeText(text);
    let imgId = gCurrImg.id;
    drawMeme(imgId);
}

function onChangeFillColor(fillColor) {
    changeFillColor(fillColor);
    let imgId = gCurrImg.id;
    drawMeme(imgId);
}

function onChangeBorderColor(borderColor) {
    changeBorderColor(borderColor);
    let imgId = gCurrImg.id;
    drawMeme(imgId);
}


