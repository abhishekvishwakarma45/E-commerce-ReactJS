import { createContext, useContext, useReducer } from "react";
import { CartReducer as reducer } from "../reducer/CartReducer";
const cartContext = createContext();

const initialState = {
  cart: [],
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

  return (
    <cartContext.Provider value={{ ...state, AddToCart, removeProduct }}>
      {children}
    </cartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(cartContext);
};

export { useCartContext };
