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
        /// @ts-ignore
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
