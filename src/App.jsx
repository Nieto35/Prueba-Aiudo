import React from "react";

// REDUX

import { Provider } from "react-redux";
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import { logger } from "@middlewares";
import rootReducer from "@reducer/rootReducer";
import thunk from "redux-thunk";

// ROUTER
import Router from "@router";

const App = () => {
  const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const composedEnhancers = composeAlt(applyMiddleware(thunk, logger));

  const store = createStore(rootReducer, composedEnhancers);

  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
};

export default App;
