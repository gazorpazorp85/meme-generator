'use strict'


function onToggleMyMemesGallery() {
    toggleRenderMyMemesGallery();
    renderMyMemesGallery();
}

function toggleRenderMyMemesGallery() {
    let elMemeEditor = document.querySelector('.meme-editor-container');
    let elGallery = document.querySelector('.gallery');
    if (elMemeEditor.classList.contains("hidden")) {
        elGallery.classList.toggle('hidden');
        elGallery.classList.toggle('flex');
    } else {
        elMemeEditor.classList.toggle('hidden');
        elMemeEditor.classList.toggle('flex');
    }
    let elMyMemesGallery = document.querySelector('.my-memes-gallery');
    elMyMemesGallery.classList.toggle('hidden');
    elMyMemesGallery.classList.toggle('flex');
}

function renderMyMemesGallery() {
    let memes = loadSavedMemes();
    let strHtmls;
    let elMyMemesGallery = document.querySelector('.my-memes-gallery');
    if (memes.length === 0) {
        strHtmls = `<div class="no-saved-memes main-container flex column center align-center">
                        <h2>No saved memes yet.</h2>
                            <img class="pointer" width=100 src="img/Icons/arrow-109-48.png" onclick="onToggleBackToGallery()">
                            <h2>Go back to main gallery and choose your pic</h2>
                    </div>`;
        elMyMemesGallery.innerHTML = strHtmls;
    } else {
        strHtmls = memes.map((meme, idx) => { return `<img class="thumbnails" src="data:image/png;base64,${meme}" onclick="onRenderMyMeme(${idx})"/>`});
        elMyMemesGallery.innerHTML = strHtmls.join('');
        elMyMemesGallery.innerHTML += `<div class="no-saved-memes main-container flex column center align-center">
                                            <img class="pointer" width=100 src="img/Icons/arrow-109-48.png" onclick="onToggleBackToGallery()">
                                            <h2>Go back to main gallery</h2>
                                       </div>`
    };
}

function onToggleBackToGallery() {
    toggleRenderMyMemesGallery();
}

function onRenderMyMeme(idx) {
    toggleMyMemePage();
    renderMySavedMeme(idx);
}

function toggleMyMemePage() {
    let elMyMemesGallery = document.querySelector('.my-memes-gallery');
    elMyMemesGallery.classList.toggle('hidden');
    elMyMemesGallery.classList.toggle('flex');
    let elMyMemes = document.querySelector('.my-memes');
    elMyMemes.classList.toggle('hidden');
    elMyMemes.classList.toggle('flex');
}

function renderMySavedMeme(idx) {
    let img = loadSavedMemes();
    let strHtmls = `<img class="my-meme" src="data:image/png;base64,${img[idx]}"/>`;
    strHtmls += `<div class="my-meme-controller flex column align-center">
                    <div class="meme-controller-close pointer" onclick="onBackToMyMemesGallery()">
                    <img src="img/Icons/x-mark-48.png">
                    </div>
                    <div class="my-memes-nav flex">
                        <div class="prev-meme pointer" onclick="onPreviousMeme(${idx})">
                            <img src="img/Icons/arrow-109-48.png">
                        </div>
                        <div class="pointer" onclick="onNextMeme(${idx})">
                            <img src="img/Icons/arrow-48.png">
                        </div>
                    </div>
                    <div class="my-memes-share-delete flex center">
                        <div class="my-memes-share-delete pointer" onclick="onDeleteMeme(${idx})">
                        <img src="img/Icons/delete-48.png">
                        </div>
                        <div class="my-memes-share-delete download-button">
                            <a href="#" id="download-my-meme" onclick="onDownloadMeme()" download="myMeme.jpg">
                                <img src="img/Icons/download-48.png" title="download">
                            </a>
                        </div>
                        <div class="my-memes-share-delete pointer">
                        <form action="" id="upload-facebook" method="POST" enctype="multipart/form-data" onsubmit="uploadImg(${event})">
                            <button class="btn" type="submit">
                                <img src="img/Icons/facebook-3-48.png">
                            </button>
                        </form>
                        </div>
                    </div>
                 </div>`
    let elMyMemesPage = document.querySelector('.my-memes-page');
    elMyMemesPage.innerHTML = strHtmls;
}

function onBackToMyMemesGallery() {
    toggleMyMemePage();
}

function onPreviousMeme(idx) {
    let newIdx = previousMeme(idx);
    renderMySavedMeme(newIdx);
}

function onNextMeme(idx) {
    let newIdx = nextMeme(idx);
    renderMySavedMeme(newIdx);
}

function onDeleteMeme(idx) {
    deleteMeme(idx);
    onBackToMyMemesGallery();
    renderMyMemesGallery();
}

function onDownloadMeme() {
    let elLink = document.getElementById('download-my-meme');
    let elImage = document.querySelector('.my-meme');
    let image = elImage.src.replace(/^data:image\/(png|jpeg);base64,/, '');
    elLink.href = 'data:image/jpg;base64,' + image;
}