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