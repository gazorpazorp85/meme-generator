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
    (diff === '+') ? gMemes.txts[gCurrLine].y += 5 : gMemes.txts[gCurrLine].y -= 5;
    return gMemes;
}

function positionLine(diff) {
    (diff === '+') ? gMemes.txts[gCurrLine].y = 460 : gMemes.txts[gCurrLine].y = 60;
    return gMemes;
}

function switchLines() {
    let tempX = gMemes.txts[0].x;
    let tempY = gMemes.txts[0].y;
    let tempAlign = gMemes.txts[0].align;
    gMemes.txts[0].x = gMemes.txts[1].x;
    gMemes.txts[0].y = gMemes.txts[1].y;
    gMemes.txts[0].align = gMemes.txts[1].align;
    gMemes.txts[1].x = tempX;
    gMemes.txts[1].y = tempY;
    gMemes.txts[1].align = tempAlign;
    return gMemes;
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}