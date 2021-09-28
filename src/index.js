import React from "react";
import reactDom from "react-dom";
import App from "./components/App";
import "./index.css";

reactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);
