/// @ts-check
"use strict";

class Song {
    constructor(title, artist, year, imageUrl){
        this.title = title;
        this.artist = artist;
        this.year = year;
        this.id = Math.round(Math.random() * 10000);
        this.imageUrl = imageUrl;
        this.element = this.buildTemplate();

        this.element.addEventListener("click", e => {
            Events.emit("song/play", {
                song: this.getSong()
            })
        }, false);
    }

    getSong(){
        return {
            title: this.title,
            artist: this.artist,
            year: this.year
        }
    }
    
    buildTemplate() {
        return $(`
            <div class="song__html" data-id="${this.id}" data-title="${this.title}">
                <div class="song__html--inner">
                    <h3 class="song--title">${this.title}</h3>
                    <p class="song--artist">${this.artist}</p>
                    <p class="song--year">${this.year}</p>               
                </div>
            </div>
        `)[0];
    }
}

const SongService = (function(){
    function getSongs(){
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", "songs.json", true);
            request.onload = () => resolve(JSON.parse(request.responseText));
            request.onerror = () => reject(request.statusText);
            request.send();
        });
    }
    
    return {
        getSongs: getSongs
    }
}());

let SongHistory = (function(){
    var index = 0,
        lastPlayedIndex = -2,
        songsPlayed = [];

    Events.subscribe("song/play", (song) => {
        songsPlayed.push(song.song);
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