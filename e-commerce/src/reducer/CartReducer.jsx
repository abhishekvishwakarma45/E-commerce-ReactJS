export const CartReducer = (state, action) => {
  let cartProduct;
  let updatedCart;
  const {
    id = "",
    color = "",
    quantity = 0,
    singleProduct = {},
  } = action.payload || {};

  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProductIndex = state.cart.findIndex(
        (product) => product.id === id + color
      );

      if (existingProductIndex >= 0) {
        updatedCart = state.cart.map((product, index) =>
          index === existingProductIndex
            ? { ...product, quantity: product.quantity + quantity }
            : product
        );

        return {
          ...state,
          cart: updatedCart,
        };
      }

      cartProduct = {
        id: id + color,
        name: singleProduct.name,
        color,
        quantity,
        image: singleProduct.image[0]?.url || "",
        price: singleProduct.price,
        max: singleProduct.stock,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }

    case "CART_TOTAL_PRICE": {
      const totalAmount = state.cart.reduce(
        (initialVal, current) => initialVal + current.price * current.quantity,
        0
      );

      return {
        ...state,
        totalAmount,
      };
    }

    case "REMOVE_PRODUCT": {
      updatedCart = state.cart.filter(
        (currentProduct) => currentProduct.id !== id
      );

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
