# Taller RxJS - Búsqueda de Perfil de Usuario

Una aplicación Angular que implementa búsqueda de perfiles de usuario con autocompletado inteligente, desarrollada como parte de un taller práctico de RxJS.

## 🚀 Características

- **Búsqueda de usuarios** por username con integración a DummyJSON API
- **Autocompletado inteligente** con sugerencias en tiempo real
- **Visualización completa del perfil** con foto e información personal
- **Posts del usuario** con sistema de reacciones (likes/dislikes)
- **Comentarios** en cada post con nombres de autores
- **Diseño responsive** con Bootstrap y animaciones
- **Manejo de estados** de carga y errores

## 🛠️ Tecnologías Utilizadas

- **Angular 19** con standalone components
- **RxJS** con operadores avanzados (switchMap, debounceTime, catchError, distinctUntilChanged)
- **TypeScript** para tipado estático
- **Bootstrap 5** para estilos
- **Bootstrap Icons** para iconografía
- **DummyJSON API** para datos de prueba

## 📋 Operadores RxJS Implementados

- `switchMap` - Para cambiar entre observables de búsqueda
- `catchError` - Manejo de errores en las peticiones HTTP
- `debounceTime` - Retraso en el autocompletado para evitar spam de requests
- `distinctUntilChanged` - Evitar búsquedas duplicadas consecutivas
- `filter` - Filtrar términos de búsqueda mínimos
- `map` - Transformación de datos de la API
- `of` - Creación de observables para manejo de errores

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm (incluido con Node.js)
- Angular CLI: `npm install -g @angular/cli`

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/caenpes2003/taller-rxjs.git
   cd taller-rxjs
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación**
   ```bash
   ng serve
   ```

   O alternativamente:
   ```bash
   npm start
   ```

4. **Abrir en el navegador**

   Navega a `http://localhost:4200/`

## 🎯 Funcionalidades

### 1. Búsqueda de Usuario
- Campo de entrada para username
- Validación de entrada
- Estados de carga con spinner
- Manejo de errores y usuarios no encontrados

### 2. Autocompletado Inteligente
- Sugerencias dinámicas mientras escribes
- Debounce de 300ms para optimizar requests
- Dropdown con fotos y nombres completos
- Máximo 5 sugerencias mostradas

### 3. Perfil de Usuario
- Foto de perfil
- Información personal (nombre, email, teléfono, edad)
- Cálculo automático de edad desde fecha de nacimiento
- Badges informativos

### 4. Posts y Reacciones
- Lista de posts del usuario
- Sistema de likes y dislikes con iconos
- Barras de progreso para porcentajes de reacciones
- Contador de visualizaciones

### 5. Sistema de Comentarios
- Comentarios por cada post
- Nombres de autores de comentarios
- Integración completa con la API

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── models/
│   │   └── models.ts                 # Interfaces TypeScript
│   ├── user-detail/
│   │   ├── user-detail.component.ts  # Componente de detalle de usuario
│   │   └── user-detail.component.html
│   ├── user-posts/
│   │   ├── user-posts.component.ts   # Componente de posts
│   │   └── user-posts.component.html
│   ├── api.service.ts                # Servicio para llamadas HTTP
│   ├── app.component.ts              # Componente principal
│   ├── app.component.html            # Template principal
│   ├── app.component.scss            # Estilos del componente
│   └── app.config.ts                 # Configuración de la app
├── styles.scss                       # Estilos globales
└── ...
```

## 🔧 API Utilizada

La aplicación consume la API pública de [DummyJSON](https://dummyjson.com/) para:

- **Usuarios**: `https://dummyjson.com/users`
- **Búsqueda**: `https://dummyjson.com/users/filter?key=username&value={username}`
- **Posts**: `https://dummyjson.com/users/{id}/posts`
- **Comentarios**: `https://dummyjson.com/posts/{id}/comments`

## 🎨 Estilos y UI/UX

- **Bootstrap 5** para layout responsive
- **Bootstrap Icons** para iconografía consistente
- **Animaciones CSS** para transiciones suaves
- **Estados de carga** con spinners
- **Alertas informativas** para feedback del usuario
- **Hover effects** en elementos interactivos

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Dispositivos móviles
- 📱 Tablets
- 💻 Escritorio

## 🧪 Testing

Para ejecutar las pruebas:

```bash
# Pruebas unitarias
ng test

# Pruebas end-to-end
ng e2e
```

## 🏗️ Build

Para construir el proyecto para producción:

```bash
ng build
```

Los archivos de build se generarán en el directorio `dist/`.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte de un taller educativo de RxJS.

## 👨‍💻 Autor

Desarrollado como parte del Taller RxJS con Angular.

---

⭐ ¡No olvides dar una estrella al proyecto si te gustó!
