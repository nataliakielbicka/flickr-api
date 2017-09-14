const sInput = document.getElementById("sInput");
const response = document.getElementById("response");

let createNode = (el) => {
    return document.createElement(el);
}

let append = (parent, el) => {
    return parent.appendChild(el);
}

sInput.addEventListener("keyup", function() {
    let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1822a31c5cd782229698ed02217c7ea0&text=${sInput.value}&per_page=50&format=json&nojsoncallback=1`;
    if (!sInput.value) {
        response.firstChild.textContent = `Photos from Flickr`;
    } else {
        fetch(url)
            .then((resp) => resp.json())
            .then(data => {
                let photos = data.photos.photo;
                return photos.map(photo => {
                    let li = createNode("li"),
                        a = createNode("a"),
                        img = createNode("img"),
                        modal = createNode("div"),
                        modalImgDiv = createNode("div"),
                        modalImg = createNode("img"),
                        exif = createNode("a");
                    close = createNode("span");
                    a.setAttribute("href", "#");
                    img.src = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                    img.classList.add("photo");
                    modal.classList.add("modal");
                    modalImgDiv.classList.add("modal-img");
                    modalImg.src = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`;
                    const exifHref = `https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=1822a31c5cd782229698ed02217c7ea0&photo_id=${photo.id}`;
                    exif.href = exifHref;
                    exif.textContent = `open info about exif`;
                    exif.setAttribute("class", "exif");
                    exif.setAttribute("target", "blank");
                    close.setAttribute("class", "close");
                    close.textContent = `x`;
                    append(li, a);
                    append(a, img);
                    append(li, modal);
                    append(modal, modalImgDiv);
                    append(modalImgDiv, modalImg);
                    append(modalImgDiv, exif);
                    append(modalImgDiv, close);
                    append(response, li);
                    openPhoto();
                })
            })
            .catch(err => {
                console.log(err);
            });

    }

});

let openPhoto = () => {
    let photo = document.getElementsByClassName("photo");
    photo = Array.prototype.slice.call(photo);
    const close = document.getElementsByClassName("close");
    photo.map(i => {
        return i.addEventListener("click", function() {
            let modal = this.parentNode.nextElementSibling;
            modal.classList.add("active");
            modal.addEventListener("click", function() {
                this.classList.remove("active");
            });
        });
    });
}