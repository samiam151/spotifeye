/// @ts-check
"use strict";

class SongProxy {
    constructor(id, hash, title="Unknown", artist="Unknown", year="Unknown", type="", album="", filename=""){ 
        this.title = title;
        this.artist = artist;
        this.year = year ? year : "N/A";
        this.id = id;
        this.type = type;
        this.fileName = filename;
        this.album = album;
        this.element = this.buildTemplate();
        this.hash = hash;

        this.element.addEventListener("click", (e) => {
            Events.emit("song/play", {
                song: this.getSong()
            });
        }, false);
    }

    getSong(){
        return {
            title: this.title,
            artist: this.artist,
            year: this.year,
            type: this.type,
            fileName: this.fileName,
            id: this.id,
            hash: this.hash
        }
    }
    
    buildTemplate() {
        /// @ts-ignore
        if (this.title && this.artist){
            return $(`
                <div class="song__html" id="song--${this.id}" data-id="${this.id}" data-title="${this.title}">
                    <div class="song__html--inner">
                        <h3 class="song--title">${this.title}</h3>
                        <p class="song--artist">${this.artist}</p>
                         <p class="song--album">${this.album}</p>
                        <p class="song--year">${this.year}</p>  
                        <p class="song--type">${this.type}</p>               
                    </div>
                </div>
            `)[0];
        } else {
            return $(`
                <div class="song__html" data-id="${this.id}" data-title="${this.title}">
                    <div class="song__html--inner">
                        <h3 class="song--title">${this.fileName}</h3>
                    </div>
                </div>
            `)[0];
        }
    }
}
