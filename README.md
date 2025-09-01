Mis Curiosidades
¡Bienvenido a "Mis Curiosidades"! Esta es una aplicación móvil web construida con Ionic y Vue.js que te permite descubrir datos curiosos aleatorios, agregarlos a tu lista de favoritos y compartirlos con tus amigos.

Características
Generación de Contenido Dinámico: Obtiene datos curiosos de una API externa.

Manejo de Favoritos: Guarda tus curiosidades preferidas de forma persistente.

Interfaz de Usuario Intuitiva: Navega fácilmente entre las pestañas de "Curiosidades" y "Favoritos".

Notificaciones: Recibe confirmaciones visuales (toasts) cuando realizas acciones.

Compartir: Comparte datos curiosos directamente desde la aplicación.

Diseño Moderno y Responsivo: La interfaz se adapta a diferentes tamaños de pantalla, ofreciendo una excelente experiencia de usuario en dispositivos móviles y de escritorio.

Tecnologías Utilizadas
Vue.js: Un marco progresivo para construir interfaces de usuario.

Ionic Framework: Herramientas de código abierto para crear aplicaciones web, iOS y Android con tecnologías web.

Firebase (Firestore): Utilizado como la base de datos para almacenar y gestionar los datos de los usuarios, como la lista de favoritos.

API Externa: Un servicio de generación de contenido para obtener datos curiosos en español.

Instalación y Uso
Para ejecutar el proyecto localmente, sigue estos pasos:

Clonar el repositorio:

git clone (https://github.com/NavI-Cs/CuriousApp.git)
cd [nombre-del-repositorio]

Instalar las dependencias del proyecto:

npm install

Ejecutar la aplicación:

ionic serve

La aplicación se abrirá en tu navegador web por defecto.

Estructura del Proyecto
src/: Contiene el código fuente de la aplicación.

src/views/: Aquí se encuentran los componentes de las diferentes páginas de la aplicación (por ejemplo, CuriosidadesPage.vue, Tab2Page.vue).

src/services/: Contiene el servicio de Firebase (firebase.service.ts) que gestiona la conexión con Firestore.

src/globals.d.ts: Un archivo de declaración para que TypeScript reconozca variables globales del entorno.

Problemas Conocidos
APis solo en ingles no se obtuverioon apis en español
