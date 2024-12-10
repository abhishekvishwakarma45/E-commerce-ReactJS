import { Fragment, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoMdCart } from "react-icons/io";

const HeaderNavbar = () => {
  const [transform, setTransform] = useState("-100%");

  return (
    <Fragment>
      <div className="navbar-container">
        <div className="logo-container">
          <NavLink to="/">
            <img
              src="https://img.freepik.com/free-vector/comic-speech-bubble-with-oops-text_1308-53484.jpg?t=st=1733738747~exp=1733742347~hmac=f2ea18be40dcb34a974dc1681a0244d8944cd7ed4aa6be16f7409c6bb03dd3a5&w=1060"
              alt="Logo"
            />
          </NavLink>
        </div>
        <div className="navbar-right-items">
          <ul className="hidden capitalize bold text-black md:hidden lg:flex items-center">
            <li className="m-4">
              <NavLink to="/product">Products</NavLink>
            </li>
            <li className="m-4">
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li className="m-4">
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li className="m-4">
              <NavLink to="/cart" className="">
                <IoMdCart className="text-xl" />
                <span className="text-red-500">(10)</span>
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
            <NavLink to="/product">Products</NavLink>
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
