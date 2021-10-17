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

export default modal;
export { showModal };
export { closeModal };
