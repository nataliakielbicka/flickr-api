(function() {
    "use strict";

    var xmlhttp = new XMLHttpRequest();
    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1822a31c5cd782229698ed02217c7ea0&tags=flower&per_page=50&format=json&nojsoncallback=1";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var answer = JSON.parse(this.responseText);
            var data = answer.photos.photo;
            //console.log(data)
            loadData(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function loadData(arr) {
        var out = "";
        for (var i = 0; i < arr.length; i++) {

            var aa = 'https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=1822a31c5cd782229698ed02217c7ea0&photo_id=' + arr[i].id;
            console.log(aa)
            out += '<img src="http://farm' + arr[i].farm + '.staticflickr.com/' + arr[i].server + '/' + arr[i].id + '_' + arr[i].secret + '.jpg">';
        }
        document.getElementById("response").innerHTML = out;
    }

})();
// var request = new XMLHttpRequest();
//     request.open("GET", 'https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=1822a31c5cd782229698ed02217c7ea0&photo_id=' + arr[i].id, false);
//     request.send();
//     var xml = request.responseXML;
//     var users = xml.getElementsByTagName("photo");
//     console.log(users)
//     for (var j = 0; j < users.length; j++) {
//         var user = users[j];
//         var names = user.getElementsByTagName("exif");
//         for (var k = 0; k < names.length; k++) {
//             console.log(names[j].childNodes[0].nodeValue);
//         }
//     }