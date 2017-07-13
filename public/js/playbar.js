/// @ts-check
"use strict";

class Playbar {
    constructor(){
        this.nowPlaying = document.querySelector("div.playbar--nowPlaying");
        this.nextSong = document.querySelector(".playbar--buttons .playbar__nextButton");
        this.stopSong = document.querySelector(".playbar--buttons .playbar__stopButton");
        this.startFromBeginning = document.querySelector(".playbar--buttons .playbar__back");
        this.isPlaying = false;
        this.songPlaying = null;
        
        Events.subscribe('song/play', (song) => { 
            this.songPlaying = song.song;
            this.updateText(song.song);
        });

        Events.subscribe('playing/update', (song) => { 
            this.songPlaying = song.newSong;
            this.updateText(song.newSong);
        });

        this.nextSong.addEventListener("click", (e) => {
            Events.emit("song/next");
        });

        this.startFromBeginning.addEventListener("click", (e) => {
            Events.emit("song/back");        
        });

        this.stopSong.addEventListener("click", (e) => {
            Events.emit("song/stop");
        });
    }

    updateText(song) {
        /// @ts-ignore
        if (song.title && song.artist){
            this.nowPlaying.innerHTML = `
                <h2>${song.title}</h2>
                <p>${song.artist}</p>
            `;
        } else {
             this.nowPlaying.innerHTML = `
                <p>${song.fileName}</p>
            `;
        }
         
    }
}