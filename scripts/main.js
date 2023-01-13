'use strict';

let size = window.matchMedia("(max-width: 1048px)"); 

const page = {
     image : document.querySelector('.content-area img.app-image')
};

function rerender() {
    if (size.matches) {
        page.image.setAttribute('src', '/images/MAIN_MOB.svg');
    } else {
        page.image.setAttribute('src', '/images/MAIN.svg');
    }
}

size.addEventListener('change', () => {
    this.rerender();
});

/* init */

(() => {
	rerender();
})();

