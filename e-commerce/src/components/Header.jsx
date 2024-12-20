import { Fragment, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoMdCart } from "react-icons/io";
import { useCartContext } from "../context/CartContext";

const HeaderNavbar = () => {
  const [transform, setTransform] = useState("-100%");
  let { cart } = useCartContext();

  return (
    <Fragment>
      <div className="navbar-container">
        <div className="logo-container">
          <NavLink to="/">
            <img
              src="https://img.freepik.com/premium-vector/av-logo-design_731343-2726.jpg?ga=GA1.1.1873205047.1726829489&semt=ais_hybrid"
              alt="Logo"
            />
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
            <li className="m-4">
              <NavLink to="/cart" className="">
                {/* <IoMdCart className="text-xl" /> */}Cart
                <span className="text-red-500">({cart.length})</span>
              </NavLink>
            </li>
          </ul>
          <button
            className="h-auto w-auto text-black block md:block lg:hidden xl:hidden"
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
        <button className="text-2xl" onClick={() => setTransform("-100%")}>
          <RxCross1 />
        </button>
        <ul className="capitalize bold text-black">
          <li className="m-4">
            <NavLink to="/products">Products</NavLink>
          </li>
          <li className="m-4">
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li className="m-4">
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li className="m-4">
            <span className="text-red-500">(10)</span>
            <NavLink to="/cart">Cart</NavLink>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default HeaderNavbar;
