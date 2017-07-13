/// @ts-check
"use strict";

let SongHistory = (function(){
    var index = 0,
        lastPlayedIndex = -2,
        songsPlayed = [];

    Events.subscribe("song/play", (song) => {
        songsPlayed.push(song.song);
        index += 1;
        lastPlayedIndex += 1;
    });

    Events.subscribe('playing/update', (song) => { 
        songsPlayed.push(song.newSong);
        index += 1;
        lastPlayedIndex += 1;
    });

    function length(){
        return index;
    }

    function getLastPlayed() {
        if (lastPlayedIndex < 0)
            return null;

        return songsPlayed[lastPlayedIndex];
    }

    return {
        history: songsPlayed,
        length: songsPlayed.length,
        getLastPlayed: getLastPlayed
    };
}());