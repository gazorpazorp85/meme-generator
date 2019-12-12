let gCanvas;
let gCtx;
let gCurrImg;
let gCurrMeme;

function createCanvas() {
    gCanvas = document.querySelector('#main-canvas');
    gCtx = gCanvas.getContext('2d');
}

function drawMeme(imgId) {
    gCurrImg = getImageById(imgId);
    gCurrMeme = createMeme(imgId);
    gCtx.strokeStyle = gCurrMeme.txts[0].borderColor;
    gCtx.fillStyle = gCurrMeme.txts[0].color;
    gCtx.font = '50px Impact'
    let renderImg = new Image();
    renderImg.src = gCurrImg.url;
    let text = gCurrMeme.txts[0].line;
    renderImg.onload = () => {
        gCtx.drawImage(renderImg, 0, 0, gCanvas.width, gCanvas.height);
        drawText(text, 10, 60);
    }
}

function drawText(txt, x, y) { 
    gCtx.save();
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    gCtx.restore();
}