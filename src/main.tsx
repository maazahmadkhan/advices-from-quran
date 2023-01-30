import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      config.url = "/api" + config.url;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
