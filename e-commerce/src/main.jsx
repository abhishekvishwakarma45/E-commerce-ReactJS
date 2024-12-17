import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./context/ProductContext.jsx";
import { useProductContext } from "./context/ProductContext.jsx";
import { AppContext } from "./context/ProductContext.jsx";
import { FilterContextProvider } from "./context/FilterContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <AppProvider value={{ useProductContext, AppContext }}>
    <FilterContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </FilterContextProvider>
  </AppProvider>
);
