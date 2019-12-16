'use strict'

let gImgs = [];
let gNextId = 1;
let gMemes = {
    selectedTxtIdx: 0,
    txts: [{
        line: ' ',
        align: 'left',
        color: '#FFFFFF',
        borderColor: '#000000',
        fontSize: 3,
        x: 10,
        y: 50
    }]
};
let gLineCounter = 0;
let gSavedMemes = [];
const ID = 'gNextId';
const PICTURES = 'gImgs';
const MEMES = 'memes'

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
    gImgs.push(createImg('./img/003.jpg', ['political', 'president', 'trump']));
    gImgs.push(createImg('./img/004.jpg', ['cute', 'love', 'animals']));
    gImgs.push(createImg('./img/005.jpg', ['cute', 'sleepy', 'animals']));
    gImgs.push(createImg('./img/5.jpg', ['cute', 'power', 'motivation', 'child']));
    gImgs.push(createImg('./img/006.jpg', ['cute', 'sleepy', 'animals']));
    gImgs.push(createImg('./img/8.jpg', ['wonka', 'gene wilder', 'vintage']));
    gImgs.push(createImg('./img/9.jpg', ['laughter', 'sneaky', 'child']));
    gImgs.push(createImg('./img/12.jpg', ['sneaky', 'gotya', 'you']));
    gImgs.push(createImg('./img/Ancient-Aliens.jpg', ['professor', 'lunatic', 'aliens']));
    gImgs.push(createImg('./img/img5.jpg', ['surprised', 'child', 'expression']));
    gImgs.push(createImg('./img/img11.jpg', ['obama', 'laugh', 'president', 'political']));
    gImgs.push(createImg('./img/img12.jpg', ['bromance', 'sport', 'love']));
    gImgs.push(createImg('./img/leo.jpg', ['prestige', 'cheers', 'dicaprio']));
    gImgs.push(createImg('./img/meme1.jpg', ['matrix', 'morpheus', 'expression']));
    gImgs.push(createImg('./img/One-Does-Not-Simply.jpg', ['lordoftherings', 'explain', 'determined']));
    gImgs.push(createImg('./img/patrick.jpg', ['patrick', 'startrek', 'embarased']));
    gImgs.push(createImg('./img/putin.jpg', ['political', 'putin', 'boss', 'president']));
    gImgs.push(createImg('./img/X-Everywhere.jpg', ['toystory', 'behold', 'everywhere']));
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

function changeText(text) {
    let idx = gMemes.selectedTxtIdx;
    gMemes.txts[idx].line = text;
    return gMemes;
}

function addLine() {
    gLineCounter++;
    if (gLineCounter === 1) {
        gMemes.txts.push({
            line: ' ',
            align: 'left',
            color: '#FFFFFF',
            borderColor: '#000000',
            fontSize: 3,
            x: 10,
            y: gCanvas.height - 20
        });
    } else {
        gMemes.txts.push({
            line: ' ',
            align: 'left',
            color: '#FFFFFF',
            borderColor: '#000000',
            fontSize: 3,
            x: 10,
            y: gCanvas.height / 2
        });
    }
    gMemes.selectedTxtIdx = gLineCounter;
    return gMemes;
}

function deleteLine() {
    let idx = gMemes.selectedTxtIdx;
    if (idx !== 0) {
        gMemes.txts.splice(idx, 1);
        gMemes.selectedTxtIdx--;
        gLineCounter--;
    } else {
        gMemes.selectedTxtIdx = 0;
        gLineCounter = 0;
        gMemes.txts[0] = {
            line: '',
            align: 'left',
            color: '#FFFFFF',
            borderColor: '#000000',
            fontSize: 3,
            x: 10,
            y: 50
        }
    }
    return gMemes;
}

function changeFillColor(fillColor) {
    let idx = gMemes.selectedTxtIdx;
    gMemes.txts[idx].color = fillColor;
    return gMemes;
}

function changeBorderColor(borderColor) {
    let idx = gMemes.selectedTxtIdx;
    gMemes.txts[idx].borderColor = borderColor;
    return gMemes;
}

function changeFontSize(diff) {
    let idx = gMemes.selectedTxtIdx;
    let currLine = gMemes.txts[idx];
    (diff === '+') ? currLine.fontSize += 0.125 : currLine.fontSize -= 0.125;
    return gMemes;
}

function changeTextAlign(align) {
    let idx = gMemes.selectedTxtIdx;
    let currLine = gMemes.txts[idx];
    switch (align) {
        case (align = 'right'):
            currLine.x = gCanvas.width - 10;
            currLine.align = 'right';
            break;
        case (align = 'center'):
            currLine.x = gCanvas.width / 2;
            currLine.align = 'center';
            break;
        case (align = 'left'):
            currLine.x = 10;
            currLine.align = 'left';
            break;
    }
    return gMemes;
}

function switchLineUp() {
    gMemes.selectedTxtIdx = (gMemes.txts.length + gMemes.selectedTxtIdx + 1) % gMemes.txts.length;
    return gMemes;
}

function switchLineDown() {
    gMemes.selectedTxtIdx = (gMemes.txts.length + gMemes.selectedTxtIdx - 1) % gMemes.txts.length;
    return gMemes;
}

function onSaveMeme() {
    let meme = createMemeData();
    gSavedMemes.push(meme);
    saveToStorage(MEMES, gSavedMemes);
    return gSavedMemes;
}

function createMemeData() {
    let meme = gCanvas.toDataURL();
    return meme.replace(/^data:image\/(png|jpeg);base64,/, '');
}

function loadSavedMemes() {
    let gSavedMemes = loadFromStorage(MEMES, []);
    return gSavedMemes;
}

function filterPictures(searchText) {
    if (!searchText) {
        return loadPictures();
    } else {
        let filteredPictures = gImgs.filter((gImg) => {
            return (gImg.keywords.find(word => word.includes(searchText)));
        });
        return filteredPictures;
    }
}

function previousMeme(idx) {
    let imgs = loadSavedMemes();
    let currMemeIdx = (imgs.length + idx - 1) % imgs.length;
    return currMemeIdx;
}

function nextMeme(idx) {
    let imgs = loadSavedMemes();
    let currMemeIdx = (imgs.length + idx + 1) % imgs.length;
    return currMemeIdx;
}

function deleteMeme(idx) {
    gSavedMemes.splice(idx, 1);
    saveToStorage(MEMES, gSavedMemes);
    return gSavedMemes;
}