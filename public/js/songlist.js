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

        Events.subscribe("search/term", (info) => {
          let term = info.term;
            console.log(term);
          let filterSongs = this.searchFilter(term);
          console.log(filterSongs.length);
          this.render(filterSongs);
        });
    }

    searchFilter(term) {
        return this.songs.filter(song => {
            return [song.title, song.artist, song.album].some(testCase => {
                if (testCase)
                    return testCase.toLowerCase().includes(term.toLowerCase());
                return;
            });
        });
    }

    render(songs = this.songs) {
        this.targetElement.innerHTML = "";
        songs.forEach(song => {
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