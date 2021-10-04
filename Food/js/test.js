'use strict';
console.log('Запрос данных...');

const req = new Promise(function (resolve, reject) {
   setTimeout(() => {
      console.log('Подготовка данных ...');
      const product = {
         name: 'TV',
         price: 20000,
      };

      resolve(product);
   }, 2000);
});

req.then((product) => {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         product.isValue = true;
         resolve(product);
      }, 2000);
   });
}).then((data) => {
	data.modify = false;
   return data;
}).then( data => {
	console.log(data);
}).catch(() => {
	console.error('Произошла ошибка');
}).finally( () => {
	console.log('Finallly');
});



const test = time => {
	return new Promise ( (resolve, reject) => {
		setTimeout( () => resolve(), time);
	})
}

// test(1000).then( () => console.log('1000ms'));
// test(2000).then(() => console.log('2000ms'));


// Promise.all([test(1000), test(2000)]).then( () => {
// 	console.log('All');
// });

Promise.race([test(1000), test(2000)]).then(() => {
   console.log('All');
});




  // Forms


   const forms = document.querySelectorAll('form');

   const message = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...',
   };

   forms.forEach((item) => {
      postData(item);
   });

   function postData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         const statusMessage = document.createElement('img');
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
         `;
         form.insertAdjacentElement('afterend', statusMessage);

         const request = new XMLHttpRequest();
         request.open('POST', 'server.php');

         request.setRequestHeader(
            'Content-type',
            'application/json; charset-utf-8'
         );
         const formData = new FormData(form);

         const object = {};
         formData.forEach(function (value, key) {
            object[key] = value;
         });

         const json = JSON.stringify(object);

         request.send(json);
         // request.send(formData);

         request.addEventListener('load', () => {
            if (request.status === 200) {
               console.log(request.response);
               showThanksModal(message.success);
               form.reset();
               statusMessage.remove();
            } else {
               showThanksModal(message.failure);
            }
         });
      });
   }
