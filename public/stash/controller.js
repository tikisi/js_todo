'use strict';
class Controller {
    constructor() {
        this.mount();
    }

    mount() {
        const inputText = document.getElementById("input-text");
        const submit = document.getElementById("submit");
        submit.addEventListener('submit', event => {
            console.log("submitted");
            inputText.value = "";
            event.preventDefault();
        })
    }
}

let controller = new Controller();