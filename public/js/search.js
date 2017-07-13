/// @ts-check
/// <reference path="../js/events.js" />
"use strict";

const Searchbar = (function(){
    let element = null;

    function init(newElement){
        element = newElement;
        element.addEventListener("keyup", (e) => {
            Events.emit("search/term", {
                term: e.target.value
            });
        });
    }

    function checkForSearch(){
        return !!element.value;
    }

    function getSearchTerm(){
        return element.value ? element.value : "";
    }

    return {
        init: init,
        checkForSearch : checkForSearch,
        getSearchTerm : getSearchTerm
    };
}());