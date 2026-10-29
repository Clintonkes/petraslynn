import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* "/<repo>/" on the default github.io URL, "/" on a custom domain:
        set at runtime by the <base> tag index.html adds. */}
    <BrowserRouter basename={new URL(document.baseURI).pathname}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
