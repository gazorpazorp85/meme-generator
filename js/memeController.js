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
    toggleRenderPages();
    createCanvas(imgId);
}

function onToggleGallery() {
    toggleRenderPages();
    renderGallery();
}

function toggleRenderPages() {
    let elMemeEditor = document.querySelector('.meme-editor-container');
    elMemeEditor.classList.toggle('hidden');
    elMemeEditor.classList.toggle('flex');
    let elGallery = document.querySelector('.gallery');
    elGallery.classList.toggle('hidden');
    elGallery.classList.toggle('flex');
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