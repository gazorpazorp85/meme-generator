let gImgs = [];
let gNextId = 1;
let gMemes;
const ID = 'gNextId';
const PICTURES = 'gImgs';
const MEMES = 'gMemes'

function createImg(url, keywords) {
    let img = {
        id: gNextId++,
        url,
        keywords
    }
    saveToStorage(ID, gNextId);
    return img;
}

function createImgs() {
    gImgs.push(createImg('./img/003.jpg', ['political']));
    gImgs.push(createImg('./img/004.jpg', ['cute', 'love', 'animals']));
    gImgs.push(createImg('./img/005.jpg', ['cute', 'love', 'animals']));
    saveToStorage(PICTURES, gImgs);
}

function loadPictures() {
    if (gImgs.length === 0) {
        createImgs();
    } else {
        gImgs = loadFromStorage(PICTURES, []);
        gNextId = loadFromStorage(ID, 1);
    }
    return gImgs;
}

function getImageById(imgId) {
    return gImgs.find(gImg => gImg.id === imgId);
}

function createMeme(imgId) {
    gMemes = loadFromStorage(MEMES, []);
    if (gMemes.length === 0) { 
        let meme = {
            selectedImgId: imgId,
            selectedTxtIdx: 0,
            txts: [{
                line: text = ' ',
                align: 'left',
                color: '#FFFFFF',
                borderColor: '#FFFFFF'
            }]
        };
        gMemes.push(meme);
        saveToStorage(MEMES, gMemes);
        return meme;
    } else {
        getMemeById();
        return gMemes;
    }
}

function getMemeById() {
    gMemes = loadFromStorage(MEMES, []);
    let imgId = gCurrImg.id;
    for (let meme in gMemes) {
        if (imgId === gMemes[meme]) return gMemes;
    }
}

function changeText(text) {
    gCurrMeme.txts[0].line = text;
    gMemes = gCurrMeme;
    saveToStorage(MEMES, gMemes);
}

function changeFillColor(fillColor) {
    gCurrMeme.txts[0].color = fillColor;
    gMemes = gCurrMeme;
    saveToStorage(MEMES, gMemes);
}

function changeBorderColor(borderColor) {
    gCurrMeme.txts[0].borderColor = borderColor;
    gMemes = gCurrMeme;
    saveToStorage(MEMES, gMemes);
}