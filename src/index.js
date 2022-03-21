import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import Functional from "./pages/Functional";
import Class from "./pages/Class";

ReactDOM.render(
  <React.StrictMode>
    <Class />
  </React.StrictMode>,
  document.getElementById("root")
);
