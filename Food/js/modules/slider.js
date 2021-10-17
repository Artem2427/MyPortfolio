import { addZero } from './timer';

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

      current.textContent = addZero(startIndex);
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
      current.textContent = addZero(startIndex);
      whichDot();
   })

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

export default slider;
