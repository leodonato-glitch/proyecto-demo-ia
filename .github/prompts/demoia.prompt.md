# Demo IA

## Stack tecnológico:
- Vite + React.
- No usar TypeScript.
- Firebase para base de datos y autenticación.
- Autenticación usando Google Login (Firebase Auth).
- Estilos modernos y atractivos con CSS Modules preferido.
- Paleta de colores principal: tonos verdes (verde esmeralda, verde claro), complementados con blanco y grises suaves.

## Objetivo del proyecto:
1. Pagina Web para verse desde el browser y móvil.

2. Pantalla de Login con Google:
   - Mostrar logo de la aplicación.
   - Botón de "Iniciar sesión con Google".
   - Guardar datos básicos del usuario autenticado en Firebase (uid, nombre, apellido, email, foto).

3. Dashboard interno:
   - Layout con menú lateral a la izquierda (Sidebar).
   - Opciones del menú:
       - Perfil → mostrar datos del usuario autenticado.
       - Usuarios → listar todos los usuarios registrados en Firebase. Poder agregar y eliminar usuarios.
       - Galería → 
         - Mostrar 10 imágenes aleatorias desde API pública (ej: https://picsum.photos/200).
         - Boton para agregar nuevas imagenes.
         - La galería debe verse con un grid de 4 imágenes por fila.
   - Opción de cerrar sesión.

# Buenas prácticas:
- Usar componentes funcionales y Hooks (useState, useEffect, useContext).
- Crear un contexto global de autenticación (AuthContext) para manejar el estado del usuario.
- Mantener el código modular y limpio, con carpetas para: components, pages, services, context, styles.
- Refactorizar siempre que sea posible para mejorar legibilidad y mantenibilidad.
- Validar estados de carga (loading) y mostrar feedback visual.
- Manejar correctamente estados de éxito/error al llamar al API.
- Asegurar diseño responsivo y moderno (CSS con buena tipografía, espaciados, bordes redondeados y paleta verde).

## Flujo esperado:
1. Usuario abre la app → ve el Login con Google.
2. Si inicia sesión, accede al Dashboard.
3. En el menú lateral puede navegar entre:
   - Perfil (sus datos personales).
   - Usuarios (lista y gestión de usuarios de Firebase).
   - Galería:
       - Ver y agregar imágenes aleatorias.
4. Puede cerrar sesión para volver a la pantalla de Login.
