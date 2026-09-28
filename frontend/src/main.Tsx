import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.js";

// CSS is handled by the bundler; TypeScript has no declaration for this side-effect import.
// @ts-expect-error -- CSS module declaration is provided by the bundler.
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);