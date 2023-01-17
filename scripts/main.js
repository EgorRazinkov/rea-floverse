'use strict';

let size = window.matchMedia("(max-width: 960px)"); 

const page = {
     image : {
      app: document.querySelector('.app'),
      cards: document.querySelectorAll('.cards'),
     }
};

function rerender() {
    if (size.matches) {
        page.image.app.setAttribute('src', '/images/app_mob.svg');
        for (let i = 0; i < page.image.cards.length; ++i) {
          page.image.cards[i].setAttribute('src', `/images/cards_block_mob_${i + 1}.svg`);
        }
    } else {
        page.image.app.setAttribute('src', '/images/app_desk.svg');
        for (let i = 0; i < page.image.cards.length; ++i) {
          page.image.cards[i].setAttribute('src', `/images/cards_block_desk_${i + 1}.svg`);
        }
    }
}

size.addEventListener('change', () => {
    this.rerender();
});


/* init */

(() => {
	rerender();
})();

