import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import CartProduct from "./CartProduct";
import { NavLink } from "react-router-dom";
import { Fragment, useCallback, useState } from "react";
import { FormatPrice } from "../Helpers/FormatPrice";
import useLoginContext from "../context/LoginContext";

import OrderPlacedToast from "./OrderPlacedToast";

export default function Cart() {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const toastHandling = useCallback(() => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
    }, 3000);
  }, []);

  const { cart, clearCart, totalAmount } = useCartContext();

  const { token } = useLoginContext();

  console.log("context Token: " + "\n" + token);
  // const PlaceOrder = useCallback(async () => {
  //   const localStorageProduct = localStorage.getItem("cartProducts");
  //   if (!localStorageProduct) {
  //     alert("Cart is empty!");
  //     return;
  //   }

  //   let cartProducts = JSON.parse(localStorageProduct);
  //   let x = Array.isArray(cartProducts);
  //   console.log(x);
  //   cartProducts.map((current, index) => {
  //     return console.log(`at index ${index}` + current);
  //   });

  //   const response = await fetch("ecommerce/cart/add", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(cartProducts),
  //   });

  //   if (response.ok) {
  //     toastHandling();
  //   } else {
  //     alert("Failed to place order. Unauthorized.");
  //   }
  // }, [token, toastHandling]);

  const PlaceOrder = useCallback(async () => {
    const localStorageProduct = localStorage.getItem("cartProducts");
    if (!localStorageProduct) {
      alert("Cart is empty!");
      return;
    }

    let cartProducts = JSON.parse(localStorageProduct);
    if (!Array.isArray(cartProducts)) {
      alert("Invalid cart data!");
      return;
    }

    try {
      const response = await fetch("ecommerce/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartProducts), // ✅ Sending the full array
      });

      if (response.ok) {
        toastHandling();
      } else {
        const text = await response.text();
        throw new Error(text);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong: " + error.message);
    }
  }, [token, toastHandling]);

  if (cart.length <= 0) {
    return (
      <div className="cart-empty-container">
        <div className="cart-empty-message">
          <h2>Your cart is currently empty</h2>
          <p>
            Before proceeding to checkout, you must add some products to your
            shopping cart. You will find a lot of interesting products on our
            Shop page.
          </p>
        </div>

        <Link to="/products">
          <button className="continue-shopping-btn">Continue Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <Fragment>
      {orderPlaced && <OrderPlacedToast />}
      <div
        className="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="backdrop" aria-hidden="true"></div>

        <div className="overlay">
          <div className="panel-container">
            <div className="panel">
              <div className="cart-items">
                <ul className="product-list">
                  {cart.map((current) => {
                    return <CartProduct key={current.id} {...current} />;
                  })}
                </ul>
              </div>
            </div>

            <div className="footer">
              <div className="subtotal">
                <p>Subtotal</p>
                <p>
                  <FormatPrice price={totalAmount} />
                </p>
              </div>
              <p className="tax-info">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="checkout">
                <button className="checkout-btn" onClick={PlaceOrder}>
                  Order
                </button>
                <button href="#" className="clear-button" onClick={clearCart}>
                  Clear
                </button>
              </div>

              <div className="continue-shopping">
                <p>
                  or <br />
                  <NavLink to="/products">
                    <button type="button" className="continue-button">
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
