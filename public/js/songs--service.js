/// @ts-check
/// <reference path="./events.js" />
"use strict";

const SongService = (function(){
    let songs = null;

    function cacheSongs(rsongs){
        if (!songs){
            songs = rsongs;
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

    function getNextSong(nowPlaying) {
        let currentID = nowPlaying.id;
        let nextID = ++nowPlaying.id;
        let nextSong = null; 
        let groupSongs = SongService.getSongs();
        
        if (nextID < songs.length) {
            let currentSongsIndex = groupSongs.indexOf(groupSongs.find(song => song.id === currentID));
            return groupSongs[++currentSongsIndex];
        }
        return songs[0];
            
    }

    function getSongFromServer(song){
        let index = 0;
        // return new Promise((resolve, reject) => {
        //     let request = new XMLHttpRequest();
        //     request.open("POST", `/song`, true);
        //     request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        //     request.responseType = "arraybuffer";
        //     request.addEventListener("progress", (e) => {
        //         Events.emit("song/progress", {
        //             partialContent: e.target
        //         })
        //     });
        //     // request.addEventListener("progress", (e) => resolve(e.target));
        //     request.onload = () => resolve(request);
        //     request.onerror = () => reject(request.statusText);
        //     request.send(JSON.stringify(song)); 
        // });
        
            let request = new XMLHttpRequest();
            request.open("POST", `/song`, true);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.responseType = "arraybuffer";
            request.addEventListener("progress", (e) => {
                index++;
                console.log(e);
                Events.emit("upload/progress", {
                    partialContent: e.currentTarget,
                    index: index
                })
            });
            request.onload = () => {};
            request.onerror = () => {};
            request.send(JSON.stringify(song)); 

    }
    
    return {
        getNextSong: getNextSong,
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