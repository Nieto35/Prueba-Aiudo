import React, { useState } from "react";
// REACT ROUTER DOM
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
// CLOSE REACT ROUTER DOM
// RUTAS IMORTADAS CON ALIAS, ALIAS CREADOS EN WEBPACK
import Home from "@pages/home";
import Login from "@pages/Login";
import BankAccount from "@pages/BankAccount";
import DataBank from "@pages/DataBank";
// CLOSE RUTAS IMORTADAS CON ALIAS, ALIAS CREADOS EN WEBPACK

// TRAER DATOS DE LA LIBRERIA FIREBASE
import { getAuth, onAuthStateChanged } from "firebase/auth";
// CLOSE TRAER DATOS DE LA LIBRERIA FIREBASE

function Router() {
  // VARIABLE PARA CAPTURAR SI ID USER EXISTE
  const [idUser, setIdUser] = useState(false);
  // CLOSE VARIABLE PARA CAPTURAR SI ID USER EXISTE

  // TRAER TODOS LOS DATOS DEL USUARIO CON LA LIBRERIA
  const auth = getAuth();
  // CLOSE TRAER TODOS LOS DATOS DEL USUARIO CON LA LIBRERIA

  // USEEFFECT DE LA LIBRERIA FIREBASE, EN LA CUAL OBTIENE DATOS DEL URUARIO
  onAuthStateChanged(auth, (user) => {
    // VERIFICA SI EXISTE UN USUARIO Y SETEA LA VARIABLE IDUSER
    if (user) {
      // SI EL USUARIO EXISTE CAPTURO SU ID Y SETEA ID USER A TRUE
      const uid = user.uid;
      setIdUser(true);
    } else {
      // SI EL NO USUARIO EXISTE CAPTURO SU ID Y SETEA ID USER A FALSE
      setIdUser(false);
    }
    // CLOSE VERIFICA SI EXISTE UN USUARIO Y SETEA LA VARIABLE IDUSER
  });
  // CLOSE USEEFFECT DE LA LIBRERIA FIREBASE, EN LA CUAL OBTIENE DATOS DEL URUARIO

  return (
    // UTILIZO HASHROUTER POR SI QUIERO SUBIR EL PROYECTO A ALGUNA URL GRATUITA
    <HashRouter>
      <Routes>
        {idUser ? (
          // SI ID USER ES TRUE, ENTONCES HABILITO TODAS LAS RUTAS
          <>
            <Route path="/" element={<Navigate to="/private/home" replace />} />
            <Route path="/private/home" element={<Home />} />
            <Route path="/private/bankAccount" element={<BankAccount />}>
              {/* creo un slug en id para de esta manera pasar variables a traves de la url */}
              <Route path=":id" element={<BankAccount />} />
            </Route>
            <Route path="/private/dataBank" element={<DataBank />}>
              {/* creo un slug en id para de esta manera pasar variables a traves de la url */}
              <Route path=":idBank" element={<DataBank />} />
            </Route>
            <Route path="*" element={<Home />} />
          </>
        ) : (
          // SI ID USER ES FALSO, ENTONCES TODAS LAS RUTAS LLEVAN A LOGIN
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </HashRouter>
  );
}

export default Router;
