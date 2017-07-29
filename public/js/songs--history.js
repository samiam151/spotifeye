/// @ts-check
"use strict";

let SongHistory = (function(){
    var index = 0,
        lastPlayedIndex = -2,
        songsPlayed = [];

    Events.subscribe("song/play", (song) => {
        update(song.song);
    });

    Events.subscribe('playing/update', (song) => { 
        update(song.newSong);
    });

    function update(song){
        songsPlayed.push(song);
        index += 1;
        lastPlayedIndex += 1;
    }

    function length(){
        return index;
    }

    function getLastPlayed() {
        if (songsPlayed.length > 0){
            return songsPlayed[songsPlayed.length - 2];
        }
        return "";
    }

    return {
        history: songsPlayed,
        getLastPlayed: getLastPlayed
    };
}());