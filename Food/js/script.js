import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import { showModal } from './modules/modal';

('use strict');
window.addEventListener('DOMContentLoaded', function () {
   const modalTimerId = setTimeout(
      () => showModal('.modal', modalTimerId),
      5000
   );

   tabs('.tabheader__item', '.tabcontent', '.tabheader__items','tabheader__item_active');
   modal('[data-modal]', '.modal', modalTimerId);
   timer('.timer', '2021-10-23');
   cards();
   calc();
   forms('form', modalTimerId);
   slider({
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
