let gImgs = [];
let gNextId = 1;
let gMemes = {
    selectedTxtIdx: 0,
    txts: [{
        line: ' ',
        color: '#FFFFFF',
        borderColor: '#000000',
        fontSize: 1.5,
        x: 10,
        y: 60
    }, {
        line: ' ',
        color: '#FFFFFF',
        borderColor: '#000000',
        fontSize: 1.5,
        x: 10,
        y: 460
    }]
};
gCurrLine = 0;
const ID = 'gNextId';
const PICTURES = 'gImgs';

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
    gImgs.push(createImg('./img/003.jpg', ['political', 'president', 'ppff']));
    gImgs.push(createImg('./img/004.jpg', ['cute', 'love', 'animals']));
    gImgs.push(createImg('./img/005.jpg', ['cute', 'sleepy', 'animals']));
    gImgs.push(createImg('./img/5.jpg', ['cute', 'power', 'motivation']));
    gImgs.push(createImg('./img/006.jpg', ['cute', 'sleepy', 'animals']));
    gImgs.push(createImg('./img/8.jpg', ['wonka', 'gene wilder', 'vintage']));
    gImgs.push(createImg('./img/9.jpg', ['laughter', 'sneaky', 'child']));
    gImgs.push(createImg('./img/12.jpg', ['sneaky', 'gotya', 'you']));
    gImgs.push(createImg('./img/Ancient-Aliens.jpg', ['professor', 'lunatic', 'aliens']));
    gImgs.push(createImg('./img/img5.jpg', ['surprised', 'child', 'expression']));
    gImgs.push(createImg('./img/img11.jpg', ['obama', 'laugh', 'president']));
    gImgs.push(createImg('./img/img12.jpg', ['bromance', 'sport', 'love']));
    gImgs.push(createImg('./img/leo.jpg', ['prestige', 'cheers', 'dicaprio']));
    gImgs.push(createImg('./img/meme1.jpg', ['matrix', 'morpheus', 'expression']));
    gImgs.push(createImg('./img/One-Does-Not-Simply.jpg', ['lordoftherings', 'explain', 'determined']));
    gImgs.push(createImg('./img/patrick.jpg', ['patrick', 'startrek', 'embarased']));
    gImgs.push(createImg('./img/putin.jpg', ['political', 'putin', 'boss']));
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
    gMemes.txts[gCurrLine].line = text;
    return gMemes;
}

function checkWhichLine(elLine) {
    if (elLine === "top-text") {
        gCurrLine = 0;
        gMemes.selectedTxtIdx = 0;
    } else {
        gCurrLine = 1;
        gMemes.selectedTxtIdx = 1;
    }
    return gCurrLine;
}

function changeFillColor(fillColor) {
    gMemes.txts[gCurrLine].color = fillColor;
    return gMemes;
}

function changeBorderColor(borderColor) {
    gMemes.txts[gCurrLine].borderColor = borderColor;
    return gMemes;
}

function changeFontSize(diff) {
    let currLine = gMemes.txts[gCurrLine];
    (diff === '+') ? currLine.fontSize += 2 : currLine.fontSize -= 2;
    return gMemes;
}