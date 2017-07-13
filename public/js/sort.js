/// @ts-check
/// <reference path="../js/events.js" />
"use strict";

class SortItem {
    constructor(category){
        this.id = Math.round(Math.random() * 10000);
        this.category = category; 
        
        this.arrowClasses =["fa-chevron-up", "fa-chevron-down"],
        this.arrowClassIndex = 0;
        this.arrowClass = "";
        
        this.element = $(this.getTemplate())[0];
        this.iconElement = $(this.element).find("i.fa")[0];
        
        this.initialOrder = "desc";
        this.order = "desc";

        // Events.subscribe("window/click", (e) => {
        //     console.log(e);
        //     if (e.event.target.classList.contains("sorter--item")){
        //         this.arrowClasses.forEach(cssclass => {
        //             try {
        //                 this.iconElement.classList.remove(this.arrowClass);
        //             } catch(err){}
        //         });
        //     }
        // })

        this.element.addEventListener("click", (e) => {
            this.onClick();
        });
    }

    onClick() {
        Events.emit("sort/songs", {
            name: this.category,
            order: this.order
        });
        this.order = (this.order === this.initialOrder) ? "asc" : "desc";
        this.toggleArrowClass();
    }

    toggleArrowClass(){
        this.arrowClass = this.arrowClasses[this.arrowClassIndex];
        this.iconElement.classList.add(this.arrowClasses[this.arrowClassIndex]);
        this.arrowClassIndex = this.arrowClassIndex === 0 ? 1 : 0;
        this.iconElement.classList.remove(this.arrowClasses[this.arrowClassIndex]);
    }

    getTemplate() {
        return  `<li class='sorter--item' data-id="${this.id}">
            ${this.category}
            <i class="fa ${this.arrowClass}"></i>
        </li>`;
    }

}
