/// @ts-check
"use strict";

class SongList {
    constructor(targetElement, initSongs = []) {
        this.songs = initSongs;
        this.targetElement = targetElement;
        
        if (this.songs.length > 0) {
            this.songs.forEach(song => {
                $(this.targetElement).append(song.element);
            });
        }

        Events.subscribe("sort/songs", (info) => {
           this.sortBy(info.name, info.order);
           this.render();
        });
    }

    render() {
        this.targetElement.innerHTML = "";
        this.songs.forEach(song => {
            $(this.targetElement).append(song.element);
        });
    }

    add(song){
        if (song.constructor.name === "Song"){
            this.songs.push(song);
            $(this.targetElement).append(song.element);
        }
    }

    sortBy(name, order) {
        let sortedSongs = this.songs.sort((x, y) => {
            if (order === "asc"){
                return (y[name] > x[name]) ? 1 : -1;
            }
            if (order === "desc"){
                return (y[name] < x[name]) ? 1 : -1;
            }
        });
        console.log(sortedSongs.slice(0, 2).map(x => x[name]).join(" "));
        return sortedSongs;
    }
}