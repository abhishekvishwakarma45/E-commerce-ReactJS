export const FilterReducer = (state, action) => {
  const { filterProducts, sortingValue, allProducts } = state;
  let tempFilterProduct;
  let newSortData;
  const { text, category, company, colors } = state.filter;

  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "IS_ERROR":
      return {
        ...state,
        isError: true,
      };

    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        filterProducts: [...action.payload],
        allProducts: [...action.payload],
      };

    case "GET_SORT_VALUE":
      return {
        ...state,
        sortingValue: action.payload,
      };
    case "SORTING_PRODUCT":
      newSortData = [...filterProducts];

      if (sortingValue === "lowest") {
        newSortData = newSortData.sort((a, b) => a.price - b.price);
      } else if (sortingValue === "highest") {
        newSortData = newSortData.sort((a, b) => b.price - a.price);
      } else if (sortingValue === "a-z") {
        newSortData = newSortData.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      } else if (sortingValue === "z-a") {
        newSortData = newSortData.sort((a, b) =>
          b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        );
      }
      return {
        ...state,
        filterProducts: newSortData,
      };

    case "UPDATE_FILTER_VALUE": {
      let { name, value } = action.payload;

      return {
        ...state,
        filter: {
          ...state.filter,
          [name]: value,
        },
      };
    }

    case "FILTER_PRODUCTS":
      tempFilterProduct = [...allProducts];

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((current) => {
          return current.name.toLowerCase().includes(text);
        });
      }

      if (category) {
        tempFilterProduct = tempFilterProduct.filter((current) => {
          return current.category === category;
        });
      }

      if (company) {
        tempFilterProduct = tempFilterProduct.filter((current) => {
          return current.company === company;
        });
      }

      if (colors) {
        tempFilterProduct = tempFilterProduct.filter((current) => {
          return current.colors.includes(colors);
        });
      }
      return {
        ...state,
        filterProducts: tempFilterProduct,
      };

    default:
      return state;
  }
};
