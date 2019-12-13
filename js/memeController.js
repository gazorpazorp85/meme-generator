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

function renderMyMemes() {
    let memes = loadSavedMemes();
    let strHtmls = memes.map(function (meme) {
        return `<img class="thumbnails" src="data:image/png;base64,${meme}"/>`
    });
    document.querySelector('.my-memes').innerHTML = strHtmls.join('');
}

function onToggleMyMemes() {
    toggleRenderMyMemesPage();
    renderMyMemes();
}

function toggleRenderMyMemesPage() {
    let elMemeEditor = document.querySelector('.meme-editor-container');
    let elGallery = document.querySelector('.gallery');
    if (elMemeEditor.classList.contains("hidden")) {
        elGallery.classList.toggle('hidden');
        elGallery.classList.toggle('flex');
    } else {
        elMemeEditor.classList.toggle('hidden');
        elMemeEditor.classList.toggle('flex');
    }
    let elMyMemes = document.querySelector('.my-memes');
    elMyMemes.classList.toggle('hidden');
    elMyMemes.classList.toggle('flex');
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

function onChangeTextAlign(align) {
    changeTextAlign(align);
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
    switchLine();
    drawMeme();
}