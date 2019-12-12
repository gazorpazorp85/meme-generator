'use strict'

function init() {
    loadPictures();
    renderGallery();
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
    createCanvas(imgId);
}

function onToggleGallery() {
    let elMemeEditor = document.querySelector('.meme-editor-container');
    elMemeEditor.classList.toggle('hidden');
    let elGallery = document.querySelector('.gallery');
    elGallery.classList.toggle('hidden');
    elGallery.classList.toggle('flex');
    renderGallery();
}

function onChangeText(element) {
    let elLine = element.id;
    let text = element.value;
    checkWhichLine(elLine);
    changeText(text);
    drawMeme();
}

function onChangeFillColor(fillColor) {
    changeFillColor(fillColor);
    drawMeme();
}

function onChangeBorderColor(borderColor) {
    changeBorderColor(borderColor);
    drawMeme();
}

function onChangeFontSize(diff) {
    changeFontSize(diff);
    drawMeme();
}

function onMoveLine(diff) {
    moveLine(diff);
    drawMeme();
}

function onPositionLine(diff) {
    positionLine(diff);
    drawMeme();
}

function onSwitchLines() {
    switchLines();
    drawMeme();
}