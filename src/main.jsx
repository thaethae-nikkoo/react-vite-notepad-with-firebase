import ReactDOM from "react-dom/client";
import Router from "./router";
import "./index.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import AuthContextProvider from "./contexts/AuthContext";
import { ViewContextProvider } from "./contexts/ViewContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <ViewContextProvider>
        <Router />
      </ViewContextProvider>
    </ThemeContextProvider>
  </AuthContextProvider>
);
