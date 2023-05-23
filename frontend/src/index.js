import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {RecoilRoot} from 'recoil';
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>

    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
