/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';
document.addEventListener('DOMContentLoaded', () => {
   const movieDB = {
      movies: [
         'Логан',
         'Лига справедливости',
         'Ла-ла лэнд',
         'Одержимость',
         'Скотт Пилигрим против...',
      ],
   };

   const adv = document.querySelectorAll('.promo__adv img'),
      promoTitle = document.querySelector('.promo__genre'),
      image = document.querySelector('.promo__bg'),
      moviesList = document.querySelector('.promo__interactive-list'),
      form = document.querySelector('form.add'),
      inputAdd = form.querySelector('.adding__input'),
      checkBox = form.querySelector('[type="checkbox"]');

   form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newFilm = inputAdd.value;
      const favorite = checkBox.checked;
      if (newFilm) {
         movieDB.movies.push(newFilm);
         if (favorite) {
            console.log('Добавляем любимый фильм');
         }
         addLi(movieDB.movies, moviesList);
      }

      e.target.reset();
   });

   const deleteAdv = (arr) => {
      arr.forEach((item) => {
         item.remove();
      });
   };

   const makeChanges = () => {
      promoTitle.textContent = 'драма';

      image.style.backgroundImage = 'url("img/bg.jpg")';
   };

   // const copyMovies = movieDB.movies.slice().sort();

   //  1 способ \\
   // movieDB.movies.sort();
   // const list = document.querySelectorAll('.promo__interactive-item');

   // list.forEach((item, i) => {
   //    item.innerText = `${i + 1}. ${movieDB.movies[i]}`;
   // });

   // 2 способ \\
   const sortArr = (arr) => {
      arr.sort();
   };

   const addLi = (films, parents) => {
      parents.innerHTML = '';
      sortArr(films);
      films.forEach((item, i) => {
         parents.innerHTML += `
            <li class="promo__interactive-item">${i + 1}. ${cutName(item)}
               <div class="delete"></div>
            </li>
   `;
      });

      document.querySelectorAll('.delete').forEach((bin, i) => {
         bin.addEventListener('click', () => {
            bin.parentElement.remove();
            movieDB.movies.splice(i, 1);
            addLi(films, parents);
         });
      });
   };

   function cutName(line) {
      if (line.length > 21) {
         return `${line.slice(0, 21)}...`;
      } else {
         return `${line}`;
      }
   }

   deleteAdv(adv);
   makeChanges();
   addLi(movieDB.movies, moviesList);
});
