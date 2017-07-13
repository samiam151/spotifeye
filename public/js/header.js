/// @ts-check
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
    }

    updateYear(song) {
        /// @ts-ignore
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
