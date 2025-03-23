import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import Provider from "./Provider";
import { GlobalProvider } from "./app/context/GlobalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
