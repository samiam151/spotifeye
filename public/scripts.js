/// @ts-check
"use strict";

window.onload = function(){
    init();
};

function init() {
    const header = new Header();
    const playbar = new Playbar();
    Searchbar.init(document.querySelector("#header--search"));

    window.addEventListener("click", (e) => {
        Events.emit("window/click", {
            event: e
        })
    });

    let songsContainer = document.querySelector(".songsContainer");
    let sorterContainer = document.querySelector(".sorterContainer");
    SongService.getSongs().then((data) => {
        // Cache data
        SongService.cacheSongs(data.songs);
        let songs = data.songs;
        let categories = SongsDataService.getCategories(songs);
        let songObjs = songs.map(song => new Song(song.id, song.title, song.artist, song.year, song.url, song.type, song.album, song.name));
        let songlist = new SongList(songsContainer, songObjs);
        
        // Add sorters
        categories.forEach(category => {
            let newCategory = new SortItem(category);
            /// @ts-ignore
            $(sorterContainer).append(newCategory.element);
        })

    });
}

(function(){
    let sortButton = document.querySelector(".sorter--toggleButton"),
        sortContainer = document.querySelector(".sorterContainer");
    sortButton.addEventListener("click", function(){
        sortContainer.classList.toggle("show");
        Events.emit("filter/toggle", {
            isOpen: sortContainer.classList.contains("show")
        });
    });
}());