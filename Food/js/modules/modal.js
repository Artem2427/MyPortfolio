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