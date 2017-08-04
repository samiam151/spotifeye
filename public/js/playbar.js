/// @ts-check
"use strict";

class Playbar {
    constructor(){
        this.nowPlaying = document.querySelector("div.playbar--nowPlaying .playingText");
        this.nextSong = document.querySelector(".playbar--buttons .playbar__nextButton");
        this.toggleSong = document.querySelector(".playbar--buttons .playbar__stopButton");
        this.startFromBeginning = document.querySelector(".playbar--buttons .playbar__back");
        this.isPlaying = false;

        this.statusBar = document.querySelector(".playbar .status .done");

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

        this.toggleSong.addEventListener("click", (e) => {
            if (SongPlayer.audio.paused){
                Events.emit("song/resume");
                this.toggleSong.innerHTML = "<i class='fa fa-pause'></i>";
            } else {
                Events.emit("song/pause");
                this.toggleSong.innerHTML = "<i class='fa fa-play'></i>";
            }
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