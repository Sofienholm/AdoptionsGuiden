import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import { BrowserRouter } from "react-router";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.DEV ? "/" : "/AdoptionsGuiden/"}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
