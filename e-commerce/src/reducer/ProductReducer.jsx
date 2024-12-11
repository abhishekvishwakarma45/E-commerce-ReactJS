export const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "API_ERROR":
      return {
        ...state,
        isError: true,
      };

    case "SET_API_DATA":
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featureProducts: action.payload.filter(
          (current) => current.featured === true
        ),
      };

    case "SET_SINGLE_PAGE_LOADING":
      return {
        ...state,
        isSingleLoading: true,
      };

    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload,
      };
    case "SINGLE_ERROR":
      return {
        ...state,
        isSingleError: true,
      };

    default:
      return state;
  }
};
