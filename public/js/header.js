/// @ts-check
/// <reference path="./songs--history.js" />
/// <reference path="./events.js" />
"use strict";

class Header {
    constructor(){
        this.element = document.querySelector("header.header");
        this.playingStatusElement = document.querySelector(".header span.playingStatus--year");
        this.mapCode = "header";
        
        this.lastPlaying = document.querySelector(".lastPlayed");
    
        Events.subscribe("song/play", (song) => {
            this.updateYear(song.song);
            this.updateLastPlayed(song);
            
        });

         Events.subscribe("playing/update", (song) => {
            this.updateYear(song.newSong);
            this.updateLastPlayed(song.newSong);
        });

        Events.subscribe("song/play", () => {
            let audio = SongPlayer.audio,
                statusDone = document.querySelector(".status .done"),
                statusTotal = document.querySelector(".status .total");
        });

    }
    
    updateYear(song) {
        this.playingStatusElement.innerText = song.hasOwnProperty("year")  ? song.year : "";
    }

    updateLastPlayed(song){
        let lastPlayed = SongHistory.getLastPlayed();
        /// @ts-ignore
        let template = "";

        if (lastPlayed){
            let hasBasicInfo = !!(lastPlayed.title && lastPlayed.artist);
            if ( hasBasicInfo) {
                template =  `"${lastPlayed.title}" by ${lastPlayed.artist}`;
            } else {
                template = `${lastPlayed.fileName}`;
            }
        } else {
            template = ``;
        }

        this.lastPlaying.innerText = template;
    }
}
