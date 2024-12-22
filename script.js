'use strict';

// Seleccionar elementos del DOM
let search = document.getElementById('search');
const search_input = document.getElementById('searchInput');
let favorite = false; // Variable para controlar el estado de favoritos
let storage = []; // Array para almacenar las películas favoritas
let btn_favorite = document.getElementById('favorite');// Obtener el botón de favoritos

  
search_input.addEventListener('click', function() {
      // Agregar la clase 'expand' al contenedor cuando se hace clic en el input
      this.classList.add('expand');
  });

  search_input.addEventListener('blur', function() {
    // Remover la clase 'expand' cuando el input pierde el foco
    this.classList.remove('expand');
});


// Event listener para el botón de búsqueda
search.addEventListener('click', function () {
  search_input.style.opacity = '1'; // Hacer visible el campo de búsqueda al hacer clic en el botón
});

// Event listener para la entrada de búsqueda
search_input.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    const title = search_input.value.trim(); // Obtener el título de búsqueda
    if (title !== '') {
      films_title(title); // Llamar a la función para buscar películas por título
    }
  }
});

// Event listener para el botón de favoritos
btn_favorite.addEventListener('click', function () {
  const stored_storage = JSON.parse(localStorage.getItem('storage')); // Obtener datos almacenados en el localStorage
  // Verificar si hay datos almacenados en el localStorage
  if (stored_storage) {
      // Si hay datos almacenados, asignarlos al array storage
      storage = stored_storage;
  }
  // HTML para mostrar las películas favoritas
  let films_html = '';
  // Recorrer todas las películas en el almacenamiento
  storage.forEach(film => {
      // Construir el HTML de la película con el icono de estrella lleno o vacío según sea favorita o no
      films_html += `
      <div class="container__card">
          <div class="cards" style="background-image: url(https://image.tmdb.org/t/p/w500${film.path});">
              <div class="cards__favorite" id="${film.id}" title="${film.title}">
                  ${(storage.findIndex(element => element.id == film.id) !== -1)
                      ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="star" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>'
                      : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="empty_star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/></svg>'
                  }                   
              </div>            
          </div>
          <h1 class="cards__title">${film.title}</h1>
      </div>`;
  });

  document.querySelector('.container').innerHTML = films_html; // Actualizar el HTML con las películas favoritas

  // Agregar el evento de clic a cada elemento ".cards__favorite"
  document.querySelectorAll('.cards__favorite').forEach(item => {
      item.addEventListener('click', function() {
          const film_Id = item.id; 
          // Filtrar las películas favoritas y eliminar la película con el ID seleccionado
          storage = storage.filter(film => film.id !== film_Id);
          // Actualizar los datos en el localStorage
          localStorage.setItem('storage', JSON.stringify(storage));
          // Volver a renderizar las películas favoritas
          btn_favorite.click(); // Simular el clic en el botón de favoritos para actualizar la lista
      });
  });
});




// Función principal para obtener y mostrar todas las películas
const films = async () => {
  try {
    // Obtener datos de películas de la API de TMDb
    const resquest = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=c4f0f1ad9f2ac58112f225fe38c33c5b&language=en-ES');
    const stored_storage = JSON.parse(localStorage.getItem('storage'));

    // Verificar si hay datos almacenados en el localStorage
    if (stored_storage) {
      // Si hay datos almacenados, asignarlos al array storage
      storage = stored_storage;
    }

    // HTML para mostrar las películas de la API
    let films_html = '';
    if (resquest.status === 200) {
      const data = await resquest.json();

      // Construir el HTML de cada película
      data.results.forEach(film => {
        const is_favorite = storage.findIndex(element => element.id == film.id) !== -1;
        films_html += `
        <div class="container__card">
        <div class="cards" style="background-image: url(https://image.tmdb.org/t/p/w500${film.poster_path});">
        <div class="cards__favorite" id="${film.id}" title="${film.title}" path="https://image.tmdb.org/t/p/w500${film.poster_path}">
          ${(is_favorite)
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="star" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="empty_star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/></svg>'
          }
        </div>      
      </div>
      <h1 class="cards__title">${film.title}</h1>
      </div>
     `;
      });
      // Actualizar el HTML con las películas
      document.querySelector('.container').innerHTML = films_html;
    } else if (resquest.status === 401) {
      console.log('La URL no es correcta');
    } else if (resquest.status === 404) {
      console.log('No existe la película');
    }
  } catch (error) {
    console.log(error);
  }
  // Llamar a la función favorite_click para manejar eventos de clic en las tarjetas
  favorite_click();
  
};






// Función para buscar películas por título
const films_title = async (title) => {
  try {
    const resquest = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=c4f0f1ad9f2ac58112f225fe38c33c5b&language=en-ES&query=${encodeURIComponent(title)}`);
    const stored_storage = JSON.parse(localStorage.getItem('storage'));

    if (stored_storage) {
      storage = stored_storage;
    }

    let films_html = '';
    if (resquest.status === 200) {
      const data = await resquest.json();
      data.results.forEach(film => {
        const is_favorite = storage.findIndex(element => element.id == film.id) !== -1;
        console.log(is_favorite);
        films_html += `
        <div class="container__card">
        <div class="cards" style="background-image: url(https://image.tmdb.org/t/p/w500${film.poster_path});">
        <div class="cards__favorite" id="${film.id}" title="${film.title}" path="https://image.tmdb.org/t/p/w500${film.poster_path}">
          ${(is_favorite)
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="star" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="empty_star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/></svg>'
          }
        </div>      
      </div>
      <h1 class="cards__title">${film.title}</h1>
      </div>
     `;
      });

      document.querySelector('.container').innerHTML = films_html;
    } else if (resquest.status === 401) {
      console.log('La URL no es correcta');
    } else if (resquest.status === 404) {
      console.log('No existe la película');
    }
  } catch (error) {
    console.log(error);
  }

  favorite_click();
};

// Función para manejar eventos de clic en las tarjetas
function favorite_click() {
  // Obtener todas las tarjetas
  document.querySelectorAll('.cards__favorite').forEach(card => {
    // Recorrer cada tarjeta y añadir un event listener
    card.addEventListener('click', () => {
      // Obtener el ID de la película, la ruta de la imagen y el título de la película desde los atributos de la tarjeta
      const film_id = card.getAttribute('id');
      const path = card.getAttribute('path');
      const title_id = card.getAttribute('title');
      console.log(card);
      // Buscar si la película ya está en el almacenamiento
      const existing_index = storage.findIndex(element => element.id === film_id);

      // Si la película ya está en el almacenamiento, eliminarla; de lo contrario, agregarla
      if (existing_index !== -1) {
        storage.splice(existing_index, 1);
      } else {
        storage.push({ id: film_id, favorite: true, path: path, title: title_id });
      }

      // Guardar el estado actual del almacenamiento en localStorage
      localStorage.setItem('storage', JSON.stringify(storage));

      // Verificar si la película es favorita
      const is_favorite = storage.some(element => element.id === film_id);

      // Cambiar el icono de estrella basado en si la película es favorita o no
      const star = (is_favorite)
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/></svg>';

      // Actualizar el HTML de la tarjeta con el nuevo icono de estrella
      card.innerHTML = star;

    });
  });
}



films();
