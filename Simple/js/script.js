// code quality
// 1. naming of files/funcs/variables is important
// 2. nesting of the code, more than 2 is bad
// 3. too much if/else statements
// 4. duplicates of the code
// 5. variable that is used only once

'use strict';

document.addEventListener('DOMContentLoaded', () => {
   const hamburger = document.querySelector('.hamburger'),
      items = document.querySelectorAll('.menu__item'),
      menu = document.querySelector('.menu');

   hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('hamburger__active');
      menu.classList.toggle('menu__active');
   });

   items.forEach((item) => {
      item.addEventListener('click', () => {
         hamburger.classList.toggle('hamburger__active');
         menu.classList.toggle('menu__active');
      });
   });
});
