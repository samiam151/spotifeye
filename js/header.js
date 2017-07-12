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
    }

    updateYear(song) {
        /// @ts-ignore
        this.playingStatusElement.innerText = song.year;
    }

    updateLastPlayed(song){
        let lastPlayed = SongHistory.getLastPlayed();
        /// @ts-ignore
        this.lastPlaying.innerText = lastPlayed ? `"${lastPlayed.title}" by ${lastPlayed.artist}` : "";
    }
}