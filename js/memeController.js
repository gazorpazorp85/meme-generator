'use strict'

function init() {
    loadPictures();
    renderGallery();
}

function renderGallery() {
    let searchText = document.getElementById('search').value;
    let elGallery = document.querySelector('.gallery');
    let imgs = filterPictures(searchText);
    let strHtmls;
    if (!searchText) {
        strHtmls = imgs.map(function (img) {
            return `<img class="thumbnails" src="${img.url}" onclick="onToggleMemeEditor(${img.id})"/>`
        });
        elGallery.innerHTML = strHtmls.join('');
        return;
    } else if (imgs.length === 0) {
        strHtmls = `<h2>Sorry, no pictures matches your search term</h2>`;
        elGallery.innerHTML = strHtmls;
    } else {
        strHtmls = imgs.map(function (img) {
            return `<img class="thumbnails" src="${img.url}" onclick="onToggleMemeEditor(${img.id})"/>`
        });
        elGallery.innerHTML = strHtmls.join('');
    };
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

function onChangeText() {
    let elText = document.getElementById('line-text').value;
    changeText(elText);
    drawMeme();
}

function onAddLine() {
    addLine();
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

function onSwitchLineUp() {
    switchLineUp();
    setValuesOfLine();
    drawMeme();
}

function onSwitchLineDown() {
    switchLineDown();
    setValuesOfLine();
    drawMeme();
}

function setValuesOfLine() {
    let idx = gMemes.selectedTxtIdx;
    let elText = document.getElementById('line-text');
    let elFill = document.querySelector('.fill-color');
    let elBorder = document.querySelector('.border-color');
    elText.value = gMemes.txts[idx].line;
    elFill.value = gMemes.txts[idx].color;
    elBorder.value = gMemes.txts[idx].borderColor;
}