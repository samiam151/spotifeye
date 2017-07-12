/// @ts-check
"use strict";

const SongService = (function(){
    let songs = null;

    function cacheSongs(songs){
        if (!songs){
            songs = songs;
        }
    }

    function getSongs(){
        if (songs) {
            return songs;
        }
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", "/data", true);
            request.onload = () => resolve(JSON.parse(request.responseText));
            request.onerror = () => reject(request.statusText);
            request.send();
        });
    }

    function getSongFromServer(song){
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("POST", `/song`, true);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.responseType = "arraybuffer";
            request.onload = () => resolve(request);
            request.onerror = () => reject(request.statusText);
            request.send(JSON.stringify(song)); 
        });
    }
    
    return {
        getSongs: getSongs,
        getSongFromServer: getSongFromServer,
        cacheSongs: cacheSongs
    }
}());

var SongsDataService = (function(){

    function getCategories(songs){
        return Object.keys(songs[0]).sort();
    }

    return {
        getCategories: getCategories
    }

/// @ts-ignore
})();