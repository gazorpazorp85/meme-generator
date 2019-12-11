let gImgs = [];
let gNextId = 1;
let gMemes = [];
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
    return gImgs.find(function (gImg) {
        return gImg.id === imgId;
    });
}

function createMeme(imgId) {
    debugger;
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
        }
        return meme;
    } else {
        getMemeById(imgId);
    }
}

function getMemeById(imgId) {
    return gMemes.find(function (gMeme) {
        return gMeme.id === imgId;
    });
}

function changeFillColor(fillColor) {
    gCurrMeme.txts[0].color = fillColor;
    gMemes = gCurrMeme;
    saveToStorage(MEMES, gMemes);
}

