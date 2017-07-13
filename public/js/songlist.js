/// @ts-check
/// <reference path="../scripts.js" />
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
           let sortedSongs = this.sortBy(info.name, info.order);
           this.render(sortedSongs);
        });

        Events.subscribe("search/term", (info) => {
          let term = info.term;
          let filterSongs = this.searchFilter(term);
          this.render(filterSongs);
        });

        Events.subscribe("filter/toggle", info => {
            let isOpen = info.isOpen;
            if (isOpen){
                this.targetElement.classList.add("openFilter");
            } else {
                this.targetElement.classList.remove("openFilter");
            }
        });
    }

    searchFilter(term) {
        let searchTerm = Searchbar.getSearchTerm();
        let sortedSongs = this.songs;

        if (searchTerm){
            sortedSongs = sortedSongs.filter(song => {
                return [song.title, song.artist, song.album, song.fileName].some(songAttribute => {
                    if (songAttribute)
                        return songAttribute.toLowerCase().includes(searchTerm.toLowerCase());
                    return;
                });
            })
        }

        sortedSongs = sortedSongs.filter(song => {
            return [song.title, song.artist, song.album, song.fileName].some(testCase => {
                if (testCase)
                    return testCase.toLowerCase().includes(term.toLowerCase());
                return;
            });
        });

        return sortedSongs;
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
        let searchTerm = Searchbar.getSearchTerm();
        let sortedSongs = this.songs;

        if (searchTerm){
            sortedSongs = sortedSongs.filter(song => {
                return [song.title, song.artist, song.album, song.fileName].some(songAttribute => {
                    if (songAttribute)
                        return songAttribute.toLowerCase().includes(searchTerm.toLowerCase());
                    return;
                });
            })
        }

        sortedSongs = sortedSongs.sort((x, y) => {
            if (order === "asc"){
                return (y[name] > x[name]) ? 1 : -1;
            }
            if (order === "desc"){
                return (y[name] < x[name]) ? 1 : -1;
            }
        });

                // let hasSearchTerm = searchbar.checkForSearch();
        return sortedSongs;
    }
}