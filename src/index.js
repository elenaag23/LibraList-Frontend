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
  //storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "200071864993",
  databaseURL:
    "https://my-library-30ca5-default-rtdb.europe-west1.firebasedatabase.app",
  //appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
