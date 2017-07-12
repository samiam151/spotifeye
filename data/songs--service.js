/// @ts-check
"use strict";

const SongService = (function(){
    function getSongs(){
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", "data/songs.json", true);
            request.onload = () => resolve(JSON.parse(request.responseText));
            request.onerror = () => reject(request.statusText);
            request.send();
        });
    }
    
    return {
        getSongs: getSongs
    }
}());

var SongsDataService = (function(){

    function getCategories(songs){
        return Object.keys(songs[0]);
    }

    return {
        getCategories: getCategories
    }

/// @ts-ignore
})();