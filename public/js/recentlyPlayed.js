/// <reference path="./songs--service.js" />
/// <reference path="./songs--history.js" />
"use strict";

const RecentlyPlayed = (function($){
    const toggleElement = document.querySelector(".accessories .recentlyPlayed");
    const listElement = document.querySelector(".accessories .recentlyPlayed--list");

    Events.subscribe("song/play", (song) => {
        update(song.song);
    });

    Events.subscribe('playing/update', (song) => { 
        update(song.newSong);
    });

    toggleElement.addEventListener("click", () => {
        listElement.classList.toggle("show");
    });

    function update(song){
        // Only want the last few items
        let desiredListLength = 8,
            history = SongHistory.history.length > desiredListLength ? SongHistory.history.slice(SongHistory.history.length - desiredListLength) : SongHistory.history;
        
        listElement.innerHTML = history.map((song, index) => {
            return `
                <li class="recentlyPlayed--item" data-id="${song.id}">
                    <i class="fa fa-play-circle"></i>
                    ${song.title || song.fileName}
                </li>`;
        }).join("");
        initClickListeners();
    }

    function initClickListeners(){
        let items = Array.from(document.querySelectorAll(".recentlyPlayed--item"));
        items.forEach(item => {
            item.addEventListener("click", (e) => {
                let song = SongService.getSongByID(item.dataset.id);
                Events.emit("song/play", {
                    song: song
                });
            });
        });
    }
    
}(jQuery));