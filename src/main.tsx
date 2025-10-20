import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GetRequestCalls from "./components/MlbApiCall.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <GetRequestCalls /> {/* Remove in production  */}
  </StrictMode>
);
