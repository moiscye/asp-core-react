import "bootstrap/dist/css/bootstrap.min.css";
import "./style/myStyle.css";
import React, { Component } from "react";
import { render } from "react-dom";
import Navigation from "./Component/navigation.jsx";
import "bootstrap/dist/js/bootstrap.js";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter } from "react-router-dom";

// const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

function renderApp() {
  render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>,
    rootElement
  );
}
renderApp();

// Allow Hot Module Replacement
if (module.hot) {
  module.hot.accept();
  //module.hot.accept('./routes', () => { const NextApp = require('./routes').default; renderApp(); });
}
