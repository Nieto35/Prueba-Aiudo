import React, { useState } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "@pages/home";
import Login from "@pages/Login";
import BankAccount from "@pages/BankAccount";
import DataBank from "@pages/DataBank";

import { getAuth, onAuthStateChanged } from "firebase/auth";

function Router() {
  const [idUser, setIdUser] = useState(false);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setIdUser(true);
      // ...
    } else {
      // User is signed out
      // ...
      setIdUser(false);
    }
  });

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={idUser ? <Navigate to="/private/home" replace /> : <Login />}
        />
        <Route path="/private/home" element={idUser ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/private/bankAccount"
          element={idUser ? <BankAccount /> : <Login />}
        >
          <Route path=":id" element={<BankAccount />} />
        </Route>
        <Route
          path="/private/dataBank"
          element={idUser ? <DataBank /> : <Login />}
        >
          <Route path=":idBank" element={<DataBank />} />
        </Route>
        <Route path="*" element={idUser ? <Home /> : <Login />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
