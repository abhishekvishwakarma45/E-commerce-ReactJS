import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./ProductContext";
import { FilterReducer as reducer } from "../reducer/FilterReducer";

const FilterContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  filterProducts: [],
  allProducts: [],
  sortingValue: "lowest",
  filter: {
    text: "",
    category: "",
    company: "",
    colors: "",
  },
};

export const FilterContextProvider = ({ children }) => {
  const { products, isLoading, isError } = useProductContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!isLoading && !isError && products.length > 0) {
      dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
    }
  }, [products, isLoading, isError]);

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORTING_PRODUCT" });
  }, [products, state.sortingValue, state.filter]);

  const SortingFn = (event) => {
    dispatch({ type: "GET_SORT_VALUE", payload: event.target.value });
  };

  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    return dispatch({
      type: "UPDATE_FILTER_VALUE",
      payload: { name, value },
    });
  };

  return (
    <FilterContext.Provider value={{ ...state, SortingFn, updateFilterValue }}>
      {children}
    </FilterContext.Provider>
  );
};

export default function useFilterContext() {
  return useContext(FilterContext);
}
