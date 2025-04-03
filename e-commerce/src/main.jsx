import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./context/ProductContext.jsx";
import { useProductContext } from "./context/ProductContext.jsx";
import { AppContext } from "./context/ProductContext.jsx";
import { FilterContextProvider } from "./context/FilterContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { AdminContextProvider } from "./context/AdminContext.jsx";
import { LoginContextProvider } from "./context/LoginContext.jsx";

createRoot(document.getElementById("root")).render(
  <AppProvider value={{ useProductContext, AppContext }}>
    <AdminContextProvider>
      <FilterContextProvider>
        <CartContextProvider>
          <LoginContextProvider>
            <App />
          </LoginContextProvider>
        </CartContextProvider>
      </FilterContextProvider>
    </AdminContextProvider>
  </AppProvider>
);
