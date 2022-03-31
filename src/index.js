import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Routes from "./routes/Routes";

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
