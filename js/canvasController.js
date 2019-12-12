let gCanvas;
let gCtx;
let gCurrImg;
let gCanvasX = 10;
let gTopTextY = 60;
let gBottomTextY = 460;


function createCanvas(imgId) {
    gCanvas = document.querySelector('#main-canvas');
    gCtx = gCanvas.getContext('2d');
    gCurrImg = getImageById(imgId);
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

function drawMeme() {
    drawImg();
}

function drawText() {
    gCtx.save();
    for (let i = 0; i < gMemes.txts.length; i++) {
        let text = gMemes.txts[i].line;
        let textX = gMemes.txts[i].x;
        let textY = gMemes.txts[i].y;
        gCtx.strokeStyle = gMemes.txts[i].borderColor;
        gCtx.fillStyle = gMemes.txts[i].color;
        gCtx.font = gMemes.txts[i].fontSize + 'rem Impact';
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
    gMemes.txts[0].x = gMemes.txts[1].x;
    gMemes.txts[0].y = gMemes.txts[1].y;
    gMemes.txts[1].x = tempX;
    gMemes.txts[1].y = tempY;
    return gMemes;
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}