import React from "react";
import { createRoot } from "react-dom/client";
// LIBRERIAS DE ESTILOS Y ESTILOS
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@styles/index/index.css";
// CLOSE LIBRERIAS DE ESTILOS Y ESTILOS
// IMPORTA CONFIGURACION DE FIREBASE, Y FUNCION DE INICIO
import firebaseConfig from "./firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// CLOSE IMPORTA CONFIGURACION DE FIREBASE, Y FUNCION DE INICIO
// IMPORT JSX
import App from "./App";
// CLOSE IMPORT JSX

// INICIO DE PROYECTO
const container = document.getElementById("app");
const root = createRoot(container);
// CLOSE INICIO DE PROYECTO
// VARIABLES NECESARIAS DE INICIAR SEGUN LA DOCUMENTACION FIREBASE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// CLOSE VARIABLES NECESARIAS DE INICIAR SEGUN LA DOCUMENTACION FIREBASE
root.render(<App tab="home" />);
