/// @ts-check
"use strict";

class Song {
    constructor(title, artist, year, url, type, filename){
        this.title = title;
        this.artist = artist;
        this.year = year;
        this.id = Math.round(Math.random() * 10000);
        this.url = url;
        this.type = type;
        this.fileName = filename
        this.element = this.buildTemplate();

        this.element.addEventListener("click", (e) => {
            Events.emit("song/play", {
                song: this.getSong()
            })
        }, false);
    }

    getSong(){
        return {
            title: this.title,
            artist: this.artist,
            year: this.year,
            url: this.url,
            type: this.type,
            fileName: this.fileName
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
                    <p class="song--type">${this.type}</p>               
                </div>
            </div>
        `)[0];
    }
}
