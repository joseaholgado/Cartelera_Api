# PapaFilms: Aplicación de Cartelera de Cine

## Descripción
PapaFilms es una aplicación web que permite a los usuarios explorar una amplia selección de películas, buscar títulos específicos, y guardar sus películas favoritas para un acceso rápido. Utiliza la API de TMDb para obtener información actualizada sobre películas, incluidas imágenes y descripciones.

## Funcionalidades
1. **Visualización de películas**: Muestra un catálogo de películas populares usando datos obtenidos de la API de TMDb.
2. **Búsqueda interactiva**: 
   - Permite buscar películas por título.
   - Incluye un campo de búsqueda que se expande al hacer clic.
3. **Favoritos**: 
   - Los usuarios pueden marcar películas como favoritas, las cuales se almacenan en el navegador usando `localStorage`.
   - Opción para visualizar únicamente las películas marcadas como favoritas.
4. **Interfaz moderna**: 
   - Incluye diseño responsivo y estilizado con CSS.
   - Usa íconos SVG para indicar acciones como buscar y marcar favoritos.

## Tecnologías utilizadas
- **HTML5**: Estructura del contenido.
- **CSS3**: Diseño visual, con fuentes personalizadas de Google Fonts.
- **JavaScript**: 
  - Interactividad de la aplicación.
  - Integración con la API de TMDb.
  - Gestión del estado de favoritos mediante `localStorage`.
- **API TMDb**: Fuente de datos para películas.

## Archivos principales
1. `index.html`: Contiene la estructura principal de la página.
2. `style.css`: Define los estilos visuales de la aplicación.
3. `script.js`: Implementa la lógica de la aplicación y la interacción con la API.

## Cómo usar la aplicación
1. **Inicio**: 
   - Al cargar la página, se muestran películas populares.
2. **Búsqueda**: 
   - Escribe el título de una película en el campo de búsqueda y presiona "Enter".
3. **Favoritos**: 
   - Haz clic en el ícono de estrella de una película para agregarla o quitarla de tus favoritos.
   - Haz clic en el botón "Favoritos" para ver únicamente las películas marcadas como favoritas.

## Instalación
1. Clona este repositorio:
   ```bash
   git clone https://github.com/joseaholgado/Cartelera_Api.git

