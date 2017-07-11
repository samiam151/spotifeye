/// @ts-check
"use strict";

const header = new Header();
const playbar = new Playbar();

window.onload = function(){
    init();
};

function init() {
    const songsContainer = document.querySelector(".songsContainer");

    SongService.getSongs().then((data) => {
        data.songs
            .sort(sortByArtistDesc)
            .filter(filterForUnlikedArtist)
            .forEach(song => {
                let newSong = new Song(song.title, song.artist, song.year, song.img_url);
                $(songsContainer).append(newSong.element);
            });
    });
}

function filterForUnlikedArtist(song){
    return !song.artist.includes("Elvis Presley") 
        && !song.artist.includes("Jimmy Buffett")
        && !song.artist.includes("Bill Withers") 
        && !song.artist.includes("Tom Petty")
        && !(song.year < 1970);
}

function sortByArtistDesc(x, y){
    return y.artist > x.artist ? -1 : 1;
}