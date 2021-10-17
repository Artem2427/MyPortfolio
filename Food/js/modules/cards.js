import {getSource} from '../services/services';

function cards() {
   // Cards
   class Card {
      constructor(src, alt, title, text, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.price = price;
         this.title = title;
         this.text = text;
         this.classes = classes;
         this.parent = document.querySelector(parentSelector);
         this.transfer = 27;
         this.changeToUAH();
      }

      changeToUAH() {
         this.price = Number(this.price) * this.transfer;
      }

      render() {
         const div = document.createElement('div');

         if (this.classes.length === 0) {
            this.div = 'menu__item';
            div.classList.add(this.div);
         } else {
            this.classes.forEach((item) => div.classList.add(item));
         }

         div.innerHTML = `
                     <img src=${this.src} alt=${this.alt}>
                     <h3 class="menu__item-subtitle">${this.title}</h3>
                     <div class="menu__item-descr">${this.text}</div>
                     <div class="menu__item-divider"></div>
                     <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                     </div>`;
         this.parent.append(div);
      }
   }



   getSource('http://localhost:3000/menu').then((data) => {
      data.forEach(({ img, altimg, title, descr, price }) => {
         new Card(
            img,
            altimg,
            title,
            descr,
            price,
            '.menu__field .container',
            'menu__item'
         ).render();
      });
   });
}

export default cards;
