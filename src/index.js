import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { EventsContextProvider } from "./context/EventContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <EventsContextProvider>
      <App />
    </EventsContextProvider>
  </AuthContextProvider>
);
