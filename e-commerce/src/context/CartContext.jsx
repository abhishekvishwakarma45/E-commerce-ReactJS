import { createContext, useContext, useEffect, useReducer } from "react";
import { CartReducer as reducer } from "../reducer/CartReducer";
const cartContext = createContext();

const getLocalStorageCart = () => {
  let localCartData = localStorage.getItem("cartProducts");
  if (!localCartData) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

const initialState = {
  cart: getLocalStorageCart(),
  totalItem: "",
  totalAmount: "",
  shippingFee: "0",
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const AddToCart = (id, color, quantity, singleProduct) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, color, quantity, singleProduct },
    });
  };
  const removeProduct = (id) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: { id } });
  };

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(state.cart));
  }, [state.cart]);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <cartContext.Provider
      value={{ ...state, AddToCart, removeProduct, clearCart }}
    >
      {children}
    </cartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(cartContext);
};

export { useCartContext };
