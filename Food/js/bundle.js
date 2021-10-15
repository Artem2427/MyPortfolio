/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
   // Calc

   const result = document.querySelector('.calculating__result span');
   let sex,
      height,
      weight,
      age,
      ratio = 1.375;

   if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
   } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
   }

   if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
   } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
   }

   function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
         result.textContent = '____';
         return;
      }

      if (sex === 'female') {
         result.textContent = Math.round(
            (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
         );
      } else {
         result.textContent = Math.round(
            (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
         );
      }
   }

   calcTotal();

   function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((elem) => {
         elem.classList.remove(activeClass);
         if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
         }
         if (
            elem.getAttribute('data-ratio') === localStorage.getItem('ratio')
         ) {
            elem.classList.add(activeClass);
         }
      });
   }

   initLocalSettings(
      '.calculating__choose_big div',
      'calculating__choose-item_active'
   );
   initLocalSettings('#gender div', 'calculating__choose-item_active');

   function getStaticInformation(selector, activeCLass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach((elem) => {
         elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
               ratio = +e.target.getAttribute('data-ratio');
               localStorage.setItem(
                  'ratio',
                  +e.target.getAttribute('data-ratio')
               );
            } else {
               sex = e.target.getAttribute('id');
               localStorage.setItem('sex', e.target.getAttribute('id'));
            }
            elements.forEach((elem) => {
               elem.classList.remove(activeCLass);
            });

            e.target.classList.add(activeCLass);
            calcTotal();
         });
      });
   }

   getStaticInformation(
      '.calculating__choose_big div',
      'calculating__choose-item_active'
   );
   getStaticInformation('#gender div', 'calculating__choose-item_active');

   function getDynamicInformation(selector) {
      const input = document.querySelector(selector);

      input.addEventListener('input', () => {
         if (input.value.match(/\D/g)) {
            input.style.border = '1px solid red';
         } else {
            input.style.border = 'none';
         }

         switch (input.getAttribute('id')) {
            case 'height':
               height = +input.value;
               break;
            case 'weight':
               weight = +input.value;
               break;
            case 'age':
               age = +input.value;
               break;
         }
         calcTotal();
      });
   }

   getDynamicInformation('#height');
   getDynamicInformation('#weight');
   getDynamicInformation('#age');
}

module.exports = calc;


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

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

   const getSource = async (url) => {
      const res = await fetch(url);

      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      return await res.json();
   };

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

module.exports = cards;


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
   // Forms

   const forms = document.querySelectorAll('form');

   const message = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...',
   };

   forms.forEach((item) => {
      bindPostData(item);
   });

   const postData = async (url, data) => {
      const res = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: data,
      });
      return await res.json();
   };

   function bindPostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         const statusMessage = document.createElement('img');
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
         `;
         form.insertAdjacentElement('afterend', statusMessage);

         const formData = new FormData(form);

         // перевод в json формат  1 способ
         // const object = {};
         // formData.forEach(function (value, key) {
         //    object[key] = value;
         // });

         // 2 способ
         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         postData('http://localhost:3000/requests', json)
            .then((data) => {
               console.log(data);
               showThanksModal(message.success);
               statusMessage.remove();
            })
            .catch(() => {
               showThanksModal(message.failure);
            })
            .finally(() => {
               form.reset();
            });
      });
   }

   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      showModal();

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
         <div class = "modal__content">
            <div class = "modal__close" data-close>×</div>
            <div class = "modal__title">${message}</div>
         </div>
      `;

      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         closeModal();
      }, 3000);
   }
}

module.exports = forms;


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
   // Modal

   const modalBtns = document.querySelectorAll('[data-modal]'),
      modalWindow = document.querySelector('.modal');

   function showModal() {
      modalWindow.classList.remove('hide');
      modalWindow.classList.add('show');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
   }
   modalBtns.forEach((item) => {
      item.addEventListener('click', showModal);
   });

   function closeModal() {
      modalWindow.classList.remove('show');
      modalWindow.classList.add('hide');
      document.body.style.overflow = '';
   }

   modalWindow.addEventListener('click', (e) => {
      if (
         e.target === modalWindow ||
         e.target.getAttribute('data-close') == ''
      ) {
         closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      // console.dir(e.code);
      if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
         closeModal();
      }
   });

   const modalTimerId = setTimeout(showModal, 5000);

   function showModalByScroll() {
      if (
         window.pageYOffset + document.documentElement.clientHeight >=
         document.documentElement.scrollHeight
      ) {
         showModal();
         window.removeEventListener('scroll', showModalByScroll);
      }
   }

   window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
   // Slider

   const slider = document.querySelector('.offer__slider'),
      items = slider.querySelectorAll('.offer__slide'),
      navigation = slider.querySelector('.offer__slider-counter'),
      current = slider.querySelector('#current'),
      total = slider.querySelector('#total'),
      sliderWrapper = slider.querySelector('.offer__slider-wrapper'),
      sliderField = slider.querySelector('.offer__slider-inner'),
      width = window.getComputedStyle(sliderWrapper).width;

   let startIndex = 1;
   let offset = 0;

   total.innerHTML = addZero(items.length);
   current.innerHTML = addZero(startIndex);

   sliderField.style.cssText = ` 
         width: ${100 * items.length}%;
         display: flex;
         transition: 0.5s ease 0s;
         
   `;

   sliderWrapper.style.cssText = `overflow: hidden;`;
   items.forEach((item) => {
      item.style.width = width;
   });

   slider.style.position = 'relative';

   const indecators = document.createElement('ol'),
      dots = [];
   indecators.classList.add('carousel-indicators');
   for (let i = 0; i < items.length; i++) {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      dot.setAttribute('data-slide-to', i + 1);
      if (i == 0) {
         dot.style.opacity = 1;
      }
      indecators.append(dot);
      dots.push(dot);
   }
   slider.append(indecators);

   function toNumber(string) {
      return Number(string.replace(/\D/g, ''));
   }

   function whichDot() {
      dots.forEach((dot) => (dot.style.opacity = '.5'));
      dots[startIndex - 1].style.opacity = '1';
   }

   navigation.addEventListener('click', (e) => {
      if (e.target && e.target.matches('.offer__slider-prev')) {
         if (offset == 0) {
            offset = toNumber(width) * (items.length - 1);
         } else {
            offset -= toNumber(width);
         }
         sliderField.style.transform = `translateX(-${offset}px)`;

         if (startIndex == 1) {
            startIndex = items.length;
         } else {
            startIndex--;
         }

         current.textContent = addZero(startIndex);
         whichDot();
      } else if (e.target && e.target.matches('.offer__slider-next')) {
         if (offset == toNumber(width) * (items.length - 1)) {
            offset = 0;
         } else {
            offset += toNumber(width);
         }
         sliderField.style.transform = `translateX(-${offset}px)`;

         if (startIndex == items.length) {
            startIndex = 1;
         } else {
            startIndex++;
         }
         current.textContent = addZero(startIndex);
         whichDot();
      }
   });

   dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
         const slideTo = e.target.getAttribute('data-slide-to');

         startIndex = slideTo;
         offset = toNumber(width) * (slideTo - 1);

         sliderField.style.transform = `translateX(-${offset}px)`;

         current.textContent = addZero(startIndex);
         whichDot();
      });
   });
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
   // Tabs
   const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

   function hideTabContent() {
      tabsContent.forEach((item) => {
         item.classList.add('hide');
         item.classList.remove('show');
      });

      tabs.forEach((tab) => {
         tab.classList.remove('tabheader__item_active');
      });
   }

   function showTabContent(i = 1) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
   // Timer
   const deadLine = '2021-10-23';

   function getTiemRemaining(endTime) {
      const t = Date.parse(endTime) - Date.parse(new Date()),
         days = Math.floor(t / (1000 * 3600 * 24)),
         hours = Math.floor((t / (1000 * 3600)) % 24),
         minutes = Math.floor((t / (1000 * 60)) % 60),
         seconds = Math.floor((t / 1000) % 60);
      return {
         total: t,
         days,
         hours,
         minutes,
         seconds,
      };
   }

   function addZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         timeInterval = setInterval(updateClock, 1000);

      updateClock();
      function updateClock() {
         const t = getTiemRemaining(endtime);

         days.innerHTML = addZero(t.days);
         hours.innerHTML = addZero(t.hours);
         minutes.innerHTML = addZero(t.minutes);
         seconds.innerHTML = addZero(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }
   setClock('.timer', deadLine);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/

window.addEventListener('DOMContentLoaded', function () {
   const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
      modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
      timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
      cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
      calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
      forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
      slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

   tabs();
   modal();
   timer();
   cards();
   calc();
   forms();
   slider();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map