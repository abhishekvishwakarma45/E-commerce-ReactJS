import { Fragment, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { FiLogIn } from "react-icons/fi";

import { useCartContext } from "../context/CartContext";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const HeaderNavbar = () => {
  const [transform, setTransform] = useState("-100%");
  let { cart } = useCartContext();

  const closeSlider = () => {
    setTransform("-100%");
  };

  return (
    <Fragment>
      <div className="navbar-container">
        <div className="logo-container">
          <NavLink to="/">
            <figure>
              <img src="/logo.png" alt="Logo" />
            </figure>
          </NavLink>
        </div>
        <div className="navbar-right-items">
          <ul className="hidden capitalize bold text-black md:hidden lg:flex items-center">
            <li className="m-4">
              <NavLink to="/products">Products</NavLink>
            </li>
            <li className="m-4">
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li className="m-4">
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li className="m-4 cart-item">
              <NavLink to="/cart">
                <HiOutlineShoppingBag />
              </NavLink>
              <span className="text-red-500">({cart.length})</span>
            </li>

            <li>
              <NavLink to="/login">
                <button className="login-btn">
                  <FiLogIn />
                </button>
              </NavLink>
            </li>
          </ul>
          <button
            className="menu-btn h-auto w-auto text-black block md:block lg:hidden xl:hidden "
            onClick={() => setTransform("0")}
          >
            <HiOutlineMenuAlt3 />
          </button>
        </div>
      </div>

      <div
        className="navbar-slider"
        style={{ transform: `translateX(${transform})` }}
      >
        <div className="slider-header">
          <NavLink to="/" onClick={closeSlider}>
            <img src="/logo.png" alt="Logo" className="slider-logo" />
          </NavLink>
          <button className="text-2xl slider-close-btn" onClick={closeSlider}>
            <RxCross1 />
          </button>
        </div>
        <div className="ul-links">
          <ul className="capitalize bold text-black">
            <li className="m-4">
              <NavLink to="/products" onClick={closeSlider}>
                Products
              </NavLink>
            </li>
            <li className="m-4">
              <NavLink to="/contact" onClick={closeSlider}>
                Contact
              </NavLink>
            </li>
            <li className="m-4">
              <NavLink to="/about" onClick={closeSlider}>
                About Us
              </NavLink>
            </li>
            <li className="m-4">
              <NavLink to="/cart" onClick={closeSlider}>
                <h1>
                  cart <span className="text-red-500">({cart.length})</span>
                </h1>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="slider-footer">
          <NavLink to="/privacy-policy" onClick={closeSlider}>
            Privacy Policy
          </NavLink>
        </div>
      </div>
    </Fragment>
  );
};

export default HeaderNavbar;
