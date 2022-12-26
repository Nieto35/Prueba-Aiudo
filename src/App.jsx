import React from "react";

// IMPORTS DE REDUX
import { Provider } from "react-redux";
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import { logger } from "@middlewares";
import rootReducer from "@reducer/rootReducer";
import thunk from "redux-thunk";
// CLOSE IMPORTS DE REDUX

// ROUTER
import Router from "@router";
// CLOSE ROUTER

const App = () => {
  // CONFIGURACION PARA EL USO DE LA EXTENION REDUX DE NAVEGADOR
  // CON ESTA EXTENCION PODRAS SABER QUE DATOS ESTAN SIENDO TRAIDOS Y MODIFICADOS CON INMUTABILIDAD.
  const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // CLOSE CONFIGURACION PARA EL USO DE LA EXTENION REDUX DE NAVEGADOR

  // CON composedEnhancers VARIABLE SE CONFIGURA EL MIDDLEWARE Y LA EXTENCION PARA QUE NO HAYA CONFLICTOS
  // DOCUMENTACION REDUX THUNK
  const composedEnhancers = composeAlt(applyMiddleware(thunk, logger));

  // SE CREA EL REDUCER CON TODAS LAS CONFIGURACIONES
  const store = createStore(rootReducer, composedEnhancers);

  return (
    <>
      {/* SE ENVUELVE LA APP CON PROVIDER PARA PODER PASAR INFORMACION DE UN LADO A OTRO SIN CONEXION DE PADRE */}
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
};

export default App;
