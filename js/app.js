(function() {
    "use strict";

    var xmlhttp = new XMLHttpRequest();
    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1822a31c5cd782229698ed02217c7ea0&tags=flower&per_page=50&format=json&nojsoncallback=1";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var answer = JSON.parse(this.responseText);
            var data = answer.photos.photo;
            loadData(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function loadData(arr) {
        var out = "";
        out += "<ul>";
        for (var i = 0, arrLen = arr.length; i < arrLen; i++) {
            out += '<li><a href="#"><img src="http://farm' + arr[i].farm + '.staticflickr.com/' + arr[i].server + '/' + arr[i].id + '_' + arr[i].secret + '.jpg" class="photo"></a><div class="modal"><div class="modal-img"><img src="http://farm' + arr[i].farm + '.staticflickr.com/' + arr[i].server + '/' + arr[i].id + '_' + arr[i].secret + '.jpg"><span class="close">x</span></div></div></li>';
        }
        out += "</ul>";
        document.getElementById("response").innerHTML = out;
        openPhoto();
    }

    function openPhoto() {
        var photo = document.getElementsByClassName("photo");
        var close = document.getElementsByClassName("close");
        for (var i = 0, imgLen = photo.length; i < imgLen; i++) {
            photo[i].addEventListener("click", function() {
                var modal = this.parentNode.nextElementSibling;
                modal.classList.add("active");
                modal.addEventListener("click", function() {
                    this.classList.remove("active");
                });
            });
            close[i].addEventListener("click", function() {
                var modal = this.parentNode.parentNode;
                modal.classList.remove("active");
            });
        }
    }

})();