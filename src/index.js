import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import "./assets/index.css";
import { theme } from "./assets/muiTheme";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { client } from "./shared/utils/api";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
