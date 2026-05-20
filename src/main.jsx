import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { API_BASE_URL } from "./appConfig.js";
import App from "@creative-ops-app";

if (API_BASE_URL) {
  window.__CREATIVE_OPS_API__ = API_BASE_URL.replace(/\/$/, "");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
