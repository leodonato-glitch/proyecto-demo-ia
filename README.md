# Demo IA - Aplicación Web con React y Firebase

Una aplicación web moderna construida con React + Vite y Firebase que incluye autenticación con Google, gestión de usuarios y galería de imágenes.

## 🚀 Características

- **Autenticación con Google** usando Firebase Auth
- **Dashboard interactivo** con navegación lateral
- **Gestión de usuarios** - ver, agregar y eliminar usuarios
- **Galería de imágenes** con imágenes aleatorias desde API pública
- **Diseño responsivo** con CSS Modules
- **Paleta de colores verde** moderna y atractiva

## 🛠️ Stack Tecnológico

- **Frontend**: React 18+ con Vite
- **Autenticación**: Firebase Authentication
- **Base de datos**: Cloud Firestore
- **Estilos**: CSS Modules con variables CSS
- **API de imágenes**: Picsum Photos (https://picsum.photos/)

## 📋 Requisitos Previos

- Node.js 18+ 
- Una cuenta de Google
- Un proyecto de Firebase configurado

## ⚙️ Configuración

### 1. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita **Authentication** y configura **Google** como proveedor
4. Crea una base de datos **Cloud Firestore** en modo de prueba
5. Ve a configuración del proyecto y obtén la configuración web

### 2. Configurar el proyecto

1. Clona el repositorio e instala dependencias:
```bash
npm install
```

2. Configura Firebase en `src/services/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};
```

### 3. Ejecutar la aplicación

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📱 Uso de la Aplicación

### Login
- Haz clic en "Iniciar sesión con Google"
- Autoriza la aplicación con tu cuenta de Google
- Serás redirigido al dashboard automáticamente

### Dashboard
- **Perfil**: Ver información de tu cuenta
- **Usuarios**: Gestionar usuarios registrados
  - Ver lista de todos los usuarios
  - Agregar nuevos usuarios manualmente
  - Eliminar usuarios existentes
- **Galería**: Explorar imágenes aleatorias
  - Ver 10 imágenes iniciales
  - Agregar más imágenes con un clic
  - Eliminar imágenes individuales

### Cerrar Sesión
- Usa el botón "Cerrar Sesión" en la parte inferior del menú lateral

## 🎨 Paleta de Colores

- **Verde Esmeralda**: `#00b050` (Primary)
- **Verde Claro**: `#4ade80` (Primary Light)  
- **Blanco**: `#ffffff`
- **Grises Suaves**: `#f8fafc`, `#e2e8f0`, `#64748b`

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Sidebar.jsx
│   └── Sidebar.module.css
├── context/            # Contextos de React
│   └── AuthContext.jsx
├── pages/              # Páginas principales
│   ├── Dashboard.jsx
│   ├── Gallery.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   └── Users.jsx
├── services/           # Servicios externos
│   └── firebase.js
└── styles/             # Estilos globales
    └── global.css
```

## 🔒 Seguridad

- La autenticación se maneja completamente a través de Firebase
- Los datos de usuario se almacenan de forma segura en Firestore
- Las reglas de seguridad de Firebase deben configurarse según tus necesidades

## 🚀 Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 📝 Notas

- Las imágenes de la galería se obtienen desde https://picsum.photos/
- Los usuarios pueden ser agregados manualmente o a través de autenticación con Google
- La aplicación es completamente responsiva y funciona en dispositivos móviles

## 🤝 Contribución

1. Fork el proyecto
2. Crea una branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
