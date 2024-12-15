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
};

export const FilterContextProvider = ({ children }) => {
  const { products, isLoading, isError } = useProductContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!isLoading && !isError && products.length > 0) {
      dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
    }
  }, [products, isLoading, isError]);

  const Sorting = () => {
    let SelectValue = document.getElementById("sort");
    let sortedValue = SelectValue.options[SelectValue.selectedIndex].value;
    console.log(sortedValue);
    dispatch({
      type: "GET_SORT_VALUE",
      payload: sortedValue,
    });
  };

  useEffect(() => {
    dispatch({ type: "SORTING_PRODUCT", payload: products });
  }, [products, state.sortingValue]);

  return (
    <FilterContext.Provider value={{ ...state, Sorting }}>
      {children}
    </FilterContext.Provider>
  );
};

export default function useFilterContext() {
  return useContext(FilterContext);
}
