// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add your Firebase project configuration here
// Para configurar Firebase, necesitarás:
// 1. Crear un proyecto en https://console.firebase.google.com/
// 2. Habilitar Authentication con Google
// 3. Crear una base de datos Firestore
// 4. Obtener la configuración del proyecto

const firebaseConfig = {
  // Reemplaza estos valores con tu configuración de Firebase
  apiKey: "AIzaSyA__T5TJfUvnEMvrio0TOWMc0-zCHKc6iA",
  authDomain: "fir-ia-bed27.firebaseapp.com",
  projectId: "fir-ia-bed27",
  storageBucket: "fir-ia-bed27.firebasestorage.app",
  messagingSenderId: "689294734481",
  appId: "1:689294734481:web:487f5c4284793ee4d1bb30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
