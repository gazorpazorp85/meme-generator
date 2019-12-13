'use strict'

let gCanvas;
let gCtx;
let gCurrImg;

function createCanvas(imgId) {
    gCanvas = document.querySelector('#main-canvas');
    gCtx = gCanvas.getContext('2d');
    gCurrImg = getImageById(imgId);
    drawImg();
}

function drawMeme() {
    drawImg();
}

function drawImg() {
    let renderImg;
    if (renderImg) {
        gCtx.drawImage(renderImg, 0, 0, gCanvas.width, gCanvas.height);
        drawText(text);
    } else {
        renderImg = new Image();
        renderImg.onload = () => {
            gCtx.drawImage(renderImg, 0, 0, gCanvas.width, gCanvas.height);
            drawText();
            gCtx.restore();
        };
        renderImg.src = gCurrImg.url;
    }
}

function drawText() {
    gCtx.save();
    for (let i = 0; i < gMemes.txts.length; i++) {
        let currLine = gMemes.txts[i];
        let text = currLine.line;
        gCtx.strokeStyle = currLine.borderColor;
        gCtx.fillStyle = currLine.color;
        gCtx.textAlign = currLine.align;
        let textX = currLine.x;
        let textY = currLine.y;
        gCtx.font = currLine.fontSize + 'rem Impact';
        gCtx.fillText(text, textX, textY);
        gCtx.strokeText(text, textX, textY);
    }
    gCtx.restore();
}

function moveLine(diff) {
    let idx = gMemes.selectedTxtIdx;
    (diff === '+') ? gMemes.txts[idx].y += 5 : gMemes.txts[idx].y -= 5;
    return gMemes;
}

function positionLine(diff) {
    let idx = gMemes.selectedTxtIdx;
    (diff === '+') ? gMemes.txts[idx].y = 460 : gMemes.txts[idx].y = 60;
    return gMemes;
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}