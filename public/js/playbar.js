/// @ts-check
"use strict";

class Playbar {
    constructor(){
        this.element = document.querySelector("div.results");
        this.elementContent = document.querySelector("div.results p.result");
        this.isPlaying = false;
        this.mapCode = "playbar";
        
        Events.subscribe('song/play', (song) => { 
            this.updateText(song.song);
        });
    }

    updateText(song) {
        /// @ts-ignore
        if (song.title && song.artist){
            this.element.innerHTML = `
                <h2>${song.title}</h2>
                <p>${song.artist}</p>
                <p>${song.year}</p>
            `;
        } else {
             this.element.innerHTML = `
                <p>${song.fileName}</p>
            `;
        }
         
    }
}