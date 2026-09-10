# Chat Marcos

Aplicación de mensajería en tiempo real desarrollada con Expo y React Native, pensada como plataforma de mensajes para desarrolladores. Permite registrarse, iniciar sesión, buscar contactos por email y chatear en tiempo real.

## Tecnologías

| Tecnología | Versión | Uso |
| --- | --- | --- |
| [React Native](https://reactnative.dev) | 0.83.6 | Framework principal para construir la app nativa (iOS, Android y Web) |
| [React](https://react.dev) | 19.2.0 | Librería UI donde se construyen los componentes |
| [Expo](https://expo.dev) | ~55.0.24 | Plataforma de desarrollo y tooling (SDK, builds, config) |
| [TypeScript](https://www.typescriptlang.org) | ~5.9.2 | Tipado estático del código |
| [expo-router](https://docs.expo.dev/router/introduction) | ~55.0.14 | Enrutamiento basado en archivos |
| [React Navigation](https://reactnavigation.org) | v7 | Navegación (bottom tabs y stacks) usada debajo de expo-router |
| [Redux Toolkit](https://redux-toolkit.js.org) | ^2.12.0 | Gestión de estado global (slice de usuario) |
| [React Redux](https://react-redux.js.org) | ^9.3.0 | Conexión de Redux con los componentes React |
| [Firebase](https://firebase.google.com) | ^12.13.0 | Autenticación, Firestore y Realtime Database |
| [expo-linear-gradient](https://docs.expo.dev/versions/v55.0.0/sdk/linear-gradient) | | Fondos con degradados |
| [@expo/vector-icons](https://docs.expo.dev/guides/icons) | (bundled) | Iconografía (FontAwesome e Ionicons) |
| [dotenv](https://github.com/motdotla/dotenv) | ^17.4.2 | Variables de entorno |
| ESLint + [eslint-config-expo](https://docs.expo.dev/guides/using-eslint) | ^9 / ~55 | Linting del proyecto |

## Arquitectura

La app tiene una arquitectura orientada a capas, con una división clara entre la **capa de presentación** (pantallas y componentes), la **capa de datos** (hooks que consultan Firebase) y el **estado global** (Redux).

### Estructura de carpetas

```
src/
├── app/                  # Enrutamiento basado en archivos (expo-router)
│   ├── _layout.tsx       # Layout raíz (Stack + Provider de Redux)
│   ├── index.tsx         # Pantalla de bienvenida (Ingresar / Registrarse)
│   ├── signIn.tsx        # Inicio de sesión
│   ├── signUp.tsx        # Registro de usuario
│   └── (tabs)/           # Área autenticada con barra de pestañas
│       ├── _layout.tsx   # Tabs: Home, Chat, Perfil
│       ├── index.tsx     # Home
│       ├── chats/
│       │   ├── _layout.tsx   # Stack interno de chats
│       │   ├── index.tsx     # Lista de chats + agregar contacto
│       │   └── [chatId].tsx  # Conversación individual
│       └── profile/      # Perfil del usuario
│
├── store/                # Configuración del store de Redux Toolkit
├── data/                 # Slices de Redux (user.ts)
├── hooks/                # Capa de datos: consultas/escrituras a Firebase
│   ├── useRooms.ts       # Lista las conversaciones del usuario
│   ├── useMessages.ts    # Escucha mensajes en tiempo real (RTDB)
│   ├── useSendMessage.ts # Envía mensajes (RTDB)
│   └── useAddContact.ts  # Crea una conversación con un contacto
├── firebase/
│   ├── config.ts         # Inicialización de Firebase (Firestore + RTDB)
│   └── UserController.ts # Controlador de usuario (placeholder)
└── types/                # Tipos compartidos (Room, Message, etc.)
```

### Flujo de datos

1. **Presentación (pantallas)**: los componentes bajo `src/app` renderizan la UI y disparan acciones. Usan hooks personalizados para acceder a datos, sin tocar Firebase directamente.
2. **Estado global (Redux)**: el slice `src/data/user.ts` guarda el usuario autenticado (`id`, `username`, `email`). Se inyecta vía `Provider` en `src/app/_layout.tsx` y se lee/actualiza en pantallas como `signIn`, `signUp` y `profile`.
3. **Capa de datos (hooks)**: los hooks en `src/hooks` encapsulan la lógica de Firebase:
   - **Firestore** (`db`) almacena datos relacionales: usuarios y la metadata de las salas (`rooms`), incluyendo membresía y último mensaje.
   - **Realtime Database** (`rtdb`) almacena los mensajes en `rooms/{chatId}/messages`, con suscripción en tiempo real vía `onValue` y escritura con `set`/`push`.
4. **Autenticación**: Firebase Auth maneja el registro e inicio de sesión (`createUserWithEmailAndPassword`, `signInWithEmailAndPassword`). Al registrarse se crea el documento del usuario en Firestore.

### Navegación

- **Stack raíz**: `index` (bienvenida), `signIn`, `signUp` y `(tabs)`.
- **Tabs** (barra inferior): Home, Chat y Perfil.
- **Stack de chats**: lista de conversaciones (`index`) y pantalla de detalle dinámica `[chatId]` que recibe la sala como parámetro de ruta.

### Configuración y variables de entorno

El proyecto usa rutas alias `@/*` → `./src/*`. Las variables de Firebase se leen de un archivo `.env` con el prefijo `EXPO_PUBLIC_`:

```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

### Experimentos de Expo habilitados

Desde `app.json` están activados `typedRoutes` (rutas tipadas de expo-router) y `reactCompiler` (compilador de React para optimizar renderizados).

## Puesta en marcha

Requisitos: Node.js y [Expo](https://expo.dev).

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar el archivo .env con las credenciales de Firebase
cp .env.example .env   # (ajusta los valores según tu proyecto de Firebase)

# 3. Iniciar la app
npx expo start
```

Desde el output de Expo podrás abrir la app en:

- Development build (`npx expo run:ios` / `npx expo run:android`)
- Emulador de Android / simulador de iOS
- [Expo Go](https://expo.dev/go)

### Scripts

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo de Expo |
| `npm run ios` | Inicia la app en el simulador de iOS |
| `npm run android` | Inicia la app en el emulador de Android |
| `npm run web` | Inicia la app en el navegador |
| `npm run lint` | Ejecuta ESLint |

## Requisitos del backend (Firebase)

- **Authentication** con Email/Password habilitado.
- **Firestore** con colecciones `users` y `rooms`.
- **Realtime Database** con la ruta `rooms/{chatId}/messages`.