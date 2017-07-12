/// @ts-check
"use strict";

class SearchBar {
    constructor(element) {
        this.element = element;
        this.element.addEventListener("keyup", (e) => {
            Events.emit("search/term", {
                term: e.target.value
            });
        });
    }

}