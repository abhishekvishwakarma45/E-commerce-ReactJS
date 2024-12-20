export const CartReducer = (state, action) => {
  let cartProduct;
  let updatedCart;
  const {
    id = "",
    color = "",
    quantity = 0,
    singleProduct = {},
  } = action.payload || {};

  let newPrice;

  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProductIndex = state.cart.findIndex(
        (product) => product.id === id + color
      );

      if (existingProductIndex >= 0) {
        updatedCart = state.cart.map((product, index) =>
          index === existingProductIndex
            ? {
                ...product,
                quantity: product.quantity + quantity,
                price:
                  (product.price / product.quantity) *
                  (product.quantity + quantity),
              }
            : product
        );
      } else {
        cartProduct = {
          id: id + color,
          name: singleProduct.name,
          color,
          quantity,
          image: singleProduct.image[0]?.url || "",
          price: singleProduct.price * quantity,
          max: singleProduct.stock,
        };

        updatedCart = [...state.cart, cartProduct];
      }

      newPrice = updatedCart.reduce(
        (accumulator, current) => accumulator + current.price,
        0
      );

      return {
        ...state,
        cart: updatedCart,
        totalAmount: newPrice,
      };
    }

    case "REMOVE_PRODUCT":
      updatedCart = state.cart.filter(
        (currentProduct) => currentProduct.id !== id
      );

      newPrice = updatedCart.reduce(
        (accumulator, current) => accumulator + current.price,
        0
      );

      return {
        ...state,
        cart: updatedCart,
        totalAmount: newPrice,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
        totalAmount: 0,
      };

    default:
      return state;
  }
};
