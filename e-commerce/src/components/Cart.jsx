import { Fragment } from "react";
import { useCartContext } from "../context/CartContext";
import CartProduct from "./CartProduct";
import { NavLink } from "react-router-dom";
export default function Cart() {
  const { cart, clearCart, totalAmount } = useCartContext();

  return (
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
              <p>{totalAmount}</p>
            </div>
            <p className="tax-info">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="checkout">
              <button href="#" className="checkout-button" onClick={clearCart}>
                Clear
              </button>
            </div>
            <div className="checkout">
              <a href="#" className="checkout-button">
                Checkout
              </a>
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
  );
}
