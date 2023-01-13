'use strict';

let size = window.matchMedia("(max-width: 440px)"); 

const page = {
     footer : document.querySelector('.content-area img.app-image')
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
