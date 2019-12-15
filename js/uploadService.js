
// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();
    let elShare = document.querySelector('.share-container');
    elShare.classList.toggle('hidden');
    elShare.classList.toggle('flex');
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        let elShare = document.querySelector('.share-container');
        elShare.innerHTML = `
        <div class="download-button">
            <a href="#" onclick="onDownloadCanvas(this)">
                <img src="img/Icons/download-48.png" title="download">
            </a>
        </div>
        <div class="share-to-facebook">
            <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
                <img src="img/Icons/facebook-3-48.png" title="share to facebook"> 
            </a>
        </div>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

function uploadMySavedMeme(elForm, ev, idx) {
    ev.preventDefault();
    let elShare = document.querySelector('.share-container');
    elShare.classList.toggle('hidden');
    elShare.classList.toggle('flex');
    let myMeme = loadSavedMemes();
    document.getElementById('imgData').value = "data:image/jpeg;base64," + myMeme[idx];

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        let elShare = document.querySelector('.share-container');
        elShare.innerHTML = `
        <div class="download-button">
            <a href="#" id="download-my-meme" onclick="onDownloadMeme()" download="myMeme.jpg">
                <img src="img/Icons/download-48.png" title="download">
            </a>
        </div>
        <div class="share-to-facebook">
            <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
                <img src="img/Icons/facebook-3-48.png" title="share to facebook"> 
            </a>
        </div>`
    }

    doUploadImg(elForm, onSuccess);
}


