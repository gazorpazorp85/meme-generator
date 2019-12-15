'use strict'


function onToggleMyMemesGallery() {
    toggleRenderMyMemesGallery();
    renderMyMemesGallery();
}

function toggleRenderMyMemesGallery() {
    let elBackToGallery = document.querySelector('.back-to-gallery');
    elBackToGallery.classList.toggle('hidden');
    let elSavedMemes = document.querySelector('.saved-memes');
    elSavedMemes.classList.toggle('hidden');
    let elMyMemesGallery = document.querySelector('.my-memes-gallery');
    let elSearch = document.querySelector('.search');
    let elMemeEditor = document.querySelector('.meme-editor-container');
    let elGallery = document.querySelector('.gallery');
    if (elMemeEditor.classList.contains("hidden")) {
        elGallery.classList.toggle('hidden');
        elGallery.classList.toggle('flex');
        elSearch.classList.toggle('hidden');
    } else {
        elMemeEditor.classList.toggle('hidden');
        elMemeEditor.classList.toggle('flex');
    }
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
                            <img class="pointer" width=100 src="img/Icons/arrow-109-48.png" onclick="onToggleBackToMainGallery()">
                            <h2>Go back to main gallery and choose your pic</h2>
                    </div>`;
        elMyMemesGallery.innerHTML = strHtmls;
    } else {
        strHtmls = memes.map((meme, idx) => { return `<img class="thumbnails" src="data:image/png;base64,${meme}" onclick="onRenderMyMeme(${idx})"/>` });
        elMyMemesGallery.innerHTML = strHtmls.join('');
        elMyMemesGallery.innerHTML += `<div class="no-saved-memes main-container flex column center align-center">
                                            <img class="pointer" width=100 src="img/Icons/arrow-109-48.png" onclick="onToggleBackToMainGallery()">
                                            <h2>Go back to main gallery</h2>
                                       </div>`
    };
}

function onToggleBackToMainGallery() {

    let elGallery = document.querySelector('.gallery');
    let elSearch = document.querySelector('.search');
    let elBackToGallery = document.querySelector('.back-to-gallery');
    let elSavedMemes = document.querySelector('.saved-memes');

    elGallery.classList.toggle('hidden');
    elGallery.classList.toggle('flex');
    elSearch.classList.toggle('hidden');
    elBackToGallery.classList.toggle('hidden');
    elSavedMemes.classList.toggle('hidden');

    let elMyMemesGallery = document.querySelector('.my-memes-gallery');
    let elMyMemes = document.querySelector('.my-memes');
    
    if (elMyMemes.classList.contains("hidden")) {
        elMyMemesGallery.classList.toggle('hidden');
        elMyMemesGallery.classList.toggle('flex');
    } else {
        elMyMemes.classList.toggle('hidden');
        elMyMemes.classList.toggle('flex');
    }
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
                        <div class="data-panel flex">
                        <div class="download-share">
                            <form action="" method="POST" enctype="multipart/form-data" onsubmit="uploadMySavedMeme(this, event, ${idx})">
                                <input name="img" id="imgData" type="hidden" />
                                <button class="btn pointer" type="submit">
                                    <img src="img/Icons/sharethis-3-48.png" title="share/download">
                                </button>
                              </form>
                        </div>
                        <div class="share-container center hidden"></div>
                    </div>
                 </div>`
    let elMyMemesPage = document.querySelector('.my-memes-page');
    elMyMemesPage.innerHTML = strHtmls;
}

function onBackToMyMemesGallery() {
    toggleMyMemePage();
    let elShare = document.querySelector('.share-container');
    elShare.classList.toggle('hidden');
    elShare.classList.toggle('flex');
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
    elLink.href = 'data:image/jpeg;base64,' + image;
}