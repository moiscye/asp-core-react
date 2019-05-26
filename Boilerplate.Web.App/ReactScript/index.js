import "./style/myStyle.css";
import React, { Component } from "react";
import { render } from "react-dom";
import Navigation from "./Component/navigation.jsx";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter } from "react-router-dom";

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
