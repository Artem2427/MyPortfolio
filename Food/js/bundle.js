/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


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



   (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getSource)('http://localhost:3000/menu').then((data) => {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector,modalTimerId) {
   // Forms

   const forms = document.querySelectorAll(formSelector);

   const message = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...',
   };

   forms.forEach((item) => {
      bindPostData(item);
   });

   

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

         (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimerId);

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
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
      }, 3000);
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
function closeModal(modalSelector) {
   const modalWindow = document.querySelector(modalSelector);
   modalWindow.classList.remove('show');
   modalWindow.classList.add('hide');
   document.body.style.overflow = '';
}

function showModal(modalSelector, modalTimerId) {
   const modalWindow = document.querySelector(modalSelector);
   modalWindow.classList.remove('hide');
   modalWindow.classList.add('show');
   document.body.style.overflow = 'hidden';
   if (modalTimerId) {
      clearInterval(modalTimerId);
   }
   
}
function modal(triggerSelector, modalSelector, modalTimerId) {
   // Modal

   const modalBtns = document.querySelectorAll(triggerSelector),
      modalWindow = document.querySelector(modalSelector);

   modalBtns.forEach((item) => {
      item.addEventListener('click', () => showModal(modalSelector, modalTimerId));
   });

   modalWindow.addEventListener('click', (e) => {
      if (
         e.target === modalWindow ||
         e.target.getAttribute('data-close') == ''
      ) {
         closeModal(modalSelector);
      }
   });

   document.addEventListener('keydown', (e) => {
      // console.dir(e.code);
      if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
         closeModal(modalSelector);
      }
   });

   

   function showModalByScroll() {
      if (
         window.pageYOffset + document.documentElement.clientHeight >=
         document.documentElement.scrollHeight
      ) {
         showModal(modalSelector, modalTimerId);
         window.removeEventListener('scroll', showModalByScroll);
      }
   }

   window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field}) {
   // Slider
   const slider = document.querySelector(container),
      items = slider.querySelectorAll(slide),
      prev = document.querySelector(prevArrow),
      next = document.querySelector(nextArrow),
      current = slider.querySelector(currentCounter),
      total = slider.querySelector(totalCounter),
      sliderWrapper = slider.querySelector(wrapper),
      sliderField = slider.querySelector(field),
      width = window.getComputedStyle(sliderWrapper).width;

   let startIndex = 1;
   let offset = 0;

   total.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(items.length);
   current.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(startIndex);

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


   prev.addEventListener('click', () => {
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

      current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(startIndex);
      whichDot();
   });

   next.addEventListener('click', () => {
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
      current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(startIndex);
      whichDot();
   })

   dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
         const slideTo = e.target.getAttribute('data-slide-to');

         startIndex = slideTo;
         offset = toNumber(width) * (slideTo - 1);

         sliderField.style.transform = `translateX(-${offset}px)`;

         current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(startIndex);
         whichDot();
      });
   });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
   // Tabs
   const tabs = document.querySelectorAll(tabsSelector),
      tabsContent = document.querySelectorAll(tabsContentSelector),
      tabsParent = document.querySelector(tabsParentSelector);


   function hideTabContent() {
      tabsContent.forEach((item) => {
         item.classList.add('hide');
         item.classList.remove('show');
      });

      tabs.forEach((tab) => {
         tab.classList.remove(activeClass);
      });
   }

   function showTabContent(i = 1) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add(activeClass);
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.classList.contains(tabsSelector.slice(1))) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addZero": () => (/* binding */ addZero),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function addZero(num) {
   if (num >= 0 && num < 10) {
      return `0${num}`;
   } else {
      return num;
   }
}

function timer(id, deadLine) {
   // Timer
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
   setClock(id, deadLine);
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);



/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getSource": () => (/* binding */ getSource)
/* harmony export */ });
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

const getSource = async (url) => {
   const res = await fetch(url);

   if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
   }
   return await res.json();
};





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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









('use strict');
window.addEventListener('DOMContentLoaded', function () {
   const modalTimerId = setTimeout(
      () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showModal)('.modal', modalTimerId),
      5000
   );

   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items','tabheader__item_active');
   (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2021-10-23');
   (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
   (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
   (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
   (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
      container: '.offer__slider',
      slide: '.offer__slide',
      currentCounter: '#current',
      totalCounter: '#total',
      wrapper: '.offer__slider-wrapper',
      field: '.offer__slider-inner',
      prevArrow: '.offer__slider-prev',
      nextArrow: '.offer__slider-next',
   });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map