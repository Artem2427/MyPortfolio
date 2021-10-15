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