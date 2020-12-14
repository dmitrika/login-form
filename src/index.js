import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";

import { API } from "./api";

ReactDOM.render(
  <React.StrictMode>
    <App API={API} />
  </React.StrictMode>,
  document.getElementById("root")
);
