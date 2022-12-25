import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@styles/index/index.css";
import firebaseConfig from "./firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import App from "./App";

const container = document.getElementById("app");
const root = createRoot(container);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
root.render(<App tab="home" />);
