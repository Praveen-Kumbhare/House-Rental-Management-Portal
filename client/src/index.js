import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./components/dashboard/Dashboard";
import { ContextProvider } from "./context/Context";
import { Provider } from "react-redux";
import store from "./context/Store";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ContextProvider>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </ContextProvider>
  </Provider>
);
