import { useCartContext } from "../context/CartContext";

export const CartReducer = (state, action) => {
  let cartProduct;
  let updatedCart;
  let { id, color, quantity, singleProduct } = action.payload;

  switch (action.type) {
    case "ADD_TO_CART":
      const existingProductIndex = state.cart.findIndex(
        (product) => product.id === id + color
      );

      if (existingProductIndex >= 0) {
        state.cart[existingProductIndex].quantity += quantity;
        return {
          ...state,
          cart: [...state.cart],
        };
      }

      cartProduct = {
        id: id + color,
        name: singleProduct.name,
        color,
        quantity,
        image: singleProduct.image[0].url,
        price: singleProduct.price,
        max: singleProduct.stock,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };

    case "CART_TOTAL_PRICE":
      let total_Price = state.cart.reduce((initailVal, current) => {
        let { price, quantity } = current;
        initailVal = initailVal + price * quantity;
        return initailVal;
      }, 0);
      return {
        ...state,
        total_Price: totalPrice,
      };

    case "REMOVE_PRODUCT":
      updatedCart = state.cart.filter(
        (currentProduct) => currentProduct.id !== id
      );
      return {
        ...state,
        cart: updatedCart,
      };

    default:
      return state;
  }
};
