import { Fragment } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { NavLink } from "react-router-dom";
export const Footer = () => {
  return (
    <Fragment>
      <div className="footer-container grid grid-cols-1  md:grid-cols-2 lg:flex">
        <div className="footer-item">
          <p className="footer-heading">Oops clothing</p>
          <p className="footer-content">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="footer-item footer-item-2">
          <p className="footer-item-2-heading">Subscribe to get More Updates</p>
          <input type="text" placeholder="Enter Your E-mail:" />
          <button>Subscribe</button>
        </div>
        <div className="footer-item footer-item-3">
          <p className=" footer-item-3-heading">Follow us on</p>
          <ul>
            <li>
              <NavLink to="">
                <FaInstagram />
              </NavLink>
            </li>
            <li>
              <NavLink to="">
                <FaYoutube />
              </NavLink>
            </li>
            <li>
              <NavLink to="">
                <FaDiscord />
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-item footer-item-4">
          <p className="footer-item-4-heading">Get in touch</p>
          <p>Mobile: +91 123467890</p>
          <p>Email: abc123@gmail.com</p>
        </div>
      </div>
    </Fragment>
  );
};
