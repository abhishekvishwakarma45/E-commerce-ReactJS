import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { ProductReducer as reducer } from "../reducer/ProductReducer";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    isError: false,
    singleProduct: {},
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    isSingleError: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const API = "http://localhost:8081/product/get";

  const GetFeaturedProducts = useCallback(async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const products = await response.json();
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  }, []);

  const getSingleProduct = useCallback(async (url) => {
    dispatch({ type: "SET_SINGLE_PAGE_LOADING" });
    try {
      let response = await fetch(url);
      let singleProduct = await response.json();
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      alert("error encountered while fetching data from API");
    }
  }, []);

  useEffect(() => {
    GetFeaturedProducts(API);
  }, [GetFeaturedProducts]);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
