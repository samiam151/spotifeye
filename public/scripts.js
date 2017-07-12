/// @ts-check
"use strict";

const header = new Header();
const playbar = new Playbar();

window.onload = function(){
    init();
};

function init() {
    window.addEventListener("click", (e) => {
        Events.emit("window/click", {
            event: e
        })
    });

    let songsContainer = document.querySelector(".songsContainer");
    let sorterContainer = document.querySelector(".sorterContainer");
    SongService.getSongs().then((data) => {
        // Cache data
        let songs = data.songs.filter(forUnlikedArtist);
        let categories = SongsDataService.getCategories(songs);
        let songObjs = songs.map(song => new Song(song.title, song.artist, song.year, song.url, song.type, song.name));
        let songlist = new SongList(songsContainer, songObjs);
        
        // Add sorters
        categories.forEach(category => {
            let newCategory = new SortItem(category);
            /// @ts-ignore
            $(sorterContainer).append(newCategory.element);
        })

    });
}

function forUnlikedArtist(song){
    return !song.artist.includes("Elvis Presley") 
        && !song.artist.includes("Jimmy Buffett")
        && !song.artist.includes("Bill Withers") 
        && !song.artist.includes("Tom Petty")
        && !(song.year < 1970);
}

(function(){
    let sortButton = document.querySelector(".sorter--toggleButton"),
        sortContainer = document.querySelector(".sorterContainer");
    sortButton.addEventListener("click", function(){
        sortContainer.classList.toggle("show");
    });
}());