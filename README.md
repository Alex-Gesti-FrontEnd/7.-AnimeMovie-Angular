# 6.-Pressupostos-Angular

## 📄 Descripción - Enunciado del ejercicio

Este proyecto es una aplicación desarrollada en **Angular** que permite **explorar y visualizar películas de anime** mediante datos obtenidos de una API externa (TMDb).

El objetivo principal del ejercicio es practicar fundamentos intermedios y avanzados de Angular: **servicios, routing, signals, formularios, autenticación con Firebase, y testing.**

La aplicación permite al usuario registrarse o iniciar sesión, navegar por la lista de películas, ver detalles de cada película y gestionar su sesión de forma reactiva con Signals.

---

## ✨ Funcionalidades

- **Autenticación de usuarios 🔑**

  - Registro y login mediante **Firebase Authentication.**
  - Visualización del nombre de usuario una vez logueado.
  - Cierre de sesión seguro.

- **Exploración de películas 🎬**

  - Visualización de **tarjetas de películas** con título, poster y puntuación.
  - **Scroll infinito** para cargar más películas al desplazarse.
  - Navegación a detalles de cada película.

- **Detalle de película 📝**

  - Sinopsis completa.
  - Actores de voz y su papel.
  - Puntuación.
  - Género.

- **Gestión de estado con Signals ⚡**

  - Estado de usuario y películas gestionado con **Angular Signals.**
  - Actualización automática de vistas al cambiar los datos.

- **Routing dinámico 🌐**

  - Navegación a la pantalla de detalle de cada película mediante parámetros dinámicos (`/movie/:id`).
  - Protecciones de rutas según autenticación (overlay que bloquea contenido si no estás logueado).

- **Interfaz intuitiva y responsiva 🖥️📱**

  - Diseño basado en **Bootstrap 5**, adaptable a móviles y escritorio.
  - Mensajes de overlay cuando el usuario no está logueado.

- **Testing unitario con Jasmine + Karma 🧪**

  - Pruebas para componentes y servicios principales:
    - `AuthService` → login, registro, logout, Signals, usuario activo.
    - `LoginComponent` → envío de formularios y navegación.
    - `HomeComponent` → visualización de películas según estado de usuario.

---

## 🏗️ Arquitectura del proyecto

El proyecto sigue una arquitectura modular por componentes, propia de Angular 20:

```bash
src/
├── app/
│ ├── features/
│ │ ├── home/
│ │ │ └── home.component.ts / html / scss / spec.ts
│ │ ├── login/
│ │ │ └── login.component.ts / html / scss / spec.ts
│ │ └── movie-detail/
│ │   └── movie-detail.component.ts / html / scss / spec.ts
│ ├── core/
│ │ ├── services/
│ │ │ ├── auth.service.ts / spec.ts
│ │ │ └── movies.service.ts / spec.ts
│ │ └── models/
│ │   └── movie.model.ts
│ ├── environments/
│ │   └── environment.ts
│ ├── app.routes.ts
│ ├── app.routes.server.ts
│ ├── app.ts / html / scss
│ ├── app.config.ts
│ ├── app.config.server.ts
├── main.ts
├── main.server.ts
├── server.ts
└── styles.scss
```

- **AuthService** gestiona la sesión del usuario con Firebase.
- **MoviesService** obtiene datos de la API TMDb y los expone mediante Signals.
- Los componentes usan Signals para reactividad automática.
- El enrutado (`app.routes.ts`) maneja rutas protegidas y dinámicas.

---

## 🎨 Decisiones de diseño

- **Minimalismo visual**

  - Uso de Bootstrap y SCSS modular para un diseño limpio y legible.

- **Responsive Design**

  - Adaptado a móviles y escritorio, con tarjetas flexibles para películas.

- **UX clara**

  - Mensajes de overlay si el usuario no está logueado.
  - Scroll infinito para facilitar exploración de películas.

- **Signals en Angular 20**

  - Evita suscripciones manuales y optimiza la actualización de vistas.

---

## ⚠️ Limitaciones conocidas

- La aplicación **no almacena favoritos ni historial de películas.**

- No hay almacenamiento persistente de sesión más allá de Firebase.

- La lista de películas depende de la API externa y no hay cacheo.

- El diseño es básico, sin animaciones avanzadas.

- Tests unitarios cubren solo la lógica principal.

---

## 🚀 Roadmap / Mejoras futuras

- **Añadir favoritos y listas personalizadas** por usuario.

- **Persistencia de datos** local o en Firebase.

- **Mejorar la interfaz** con animaciones y modo oscuro/claro.

- **Implementar filtros por género, puntuación o año.**

---

## 💻 Tecnologías Utilizadas

- [Angular 20](https://angular.dev)
- **TypeScript**
- **HTML5 / SCSS / Bootstrap 5**
- **Firebase Authentication**
- **Angular Forms & Signals**
- **Angular Router**
- **Jasmine + Karma** (para testing)

---

## 📋 Requisitos

Para ejecutar este proyecto se necesita:

- Node.js (v18 o superior)
- Angular CLI instalado globalmente
  ```bash
  npm install -g @angular/cli
  ```
- Un editor de código (recomendado: _Visual Studio Code_)
- Un navegador moderno (_Chrome, Edge, Firefox, OperaGX, etc_)
- **Google Chrome** instalado (requerido por _Karma_ para los tests)

---

## 🛠️ Instalación

1.  Clona el repositorio o descarga los archivos ZIP:

```bash
git clone https://github.com/Alex-Gesti-FrontEnd/7.-AnimeMovie-Angular.git
```

2.  Abre la carpeta del proyecto en tu editor de código.

3.  Instala las dependencias:

```bash
npm install
```

---

## Ejecución

### 🖥️ Modo desarrollo

1. Inicia el servidor:

```bash
ng serve
```

2. Abre el navegador y entra en http://localhost:4200.

3. Puedes registrarte, iniciar sesión, explorar películas y navegar a detalle.

---

### 🧪 Testing

1. Ejecuta los tests con:

```bash
ng test
```

2. Se abrirá una ventana en Chrome mostrando los resultados de las pruebas unitarias (éxitos, fallos y logs detallados). Si no tienes Chrome instalado, configura otro navegador en el archivo _karma.conf.js_.

---

## 🖼️ Demo

A continuación se mostrará algunas capturas de la aplicación en funcionamiento:

- **Pantalla _Home_**

  - **_Login_ requerido**

      <p align="center">
      <img src="./docs/screen_homeNoLogin.png" alt="Demo 1" width="450"/>
    </p>

  - **_Login_ realizado**

      <p align="center">
      <img src="./docs/screen_home_1.png" alt="Demo 1" width="450"/>
    </p>
      <p align="center">
      <img src="./docs/screen_home_2.png" alt="Demo 1" width="450"/>
    </p>

- **Pantalla _Login_**

<p align="center">
      <img src="./docs/screen_login.png" alt="Demo 1" width="450"/>
</p>

- **Pantalla _Pelicula_**

  - **Información de la pelicula**

    <p align="center">
      <img src="./docs/screen_movie_1.png" alt="Demo 1" width="450"/>
  </p>

  - **Información del _cast_**

    <p align="center">
      <img src="./docs/screen_movie_2.png" alt="Demo 1" width="450"/>
  </p>

- **Formato móvil**

<p align="center">
      <img src="./docs/screen_home_mobile.png" alt="Demo 1" width="250"/>
</p>

<p align="center">
      <img src="./docs/screen_login_mobile.png" alt="Demo 1" width="250"/>
</p>

<p align="center">
      <img src="./docs/screen_movie_mobile.png" alt="Demo 1" width="250"/>
</p>

---

## © Derechos de autor

© 2025 [Alex Gesti](https://github.com/alexgesti) — Todos los derechos reservados.
