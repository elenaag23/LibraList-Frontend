import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCjSRZVJ7CPpuWJyUIYIFPLyMdzmsoAqic",
  authDomain: "my-library-30ca5.firebaseapp.com",
  projectId: "my-library-30ca5",
  messagingSenderId: "200071864993",
  databaseURL:
    "https://my-library-30ca5-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
