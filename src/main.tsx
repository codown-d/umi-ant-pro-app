import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./pageInit.ts";

createRoot(document.getElementById("AISOC")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
