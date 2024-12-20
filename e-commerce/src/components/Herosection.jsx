import { Fragment } from "react";
import { NavLink } from "react-router-dom";

export const HeroSection = () => {
  return (
    <Fragment>
      <section
        className="hero-section grid grid-cols-2 
      items-center lg:flex"
      >
        <div className="hero-section-item  ">
          <p className="content-heading">
            Welcome to <span className="uppercase">OOPS</span>
          </p>
          <p className="content-paragraph">
            Discover your new favorite t-shirts designed for comfort, style, and
            self-expression. Whether you’re into bold graphics, minimalist
            vibes, or timeless classics, we’ve got something to match your
            personality. <br />
            we believe a t-shirt is more than just clothing—it’s your canvas.
            That’s why we’re passionate about offering high-quality fabrics,
            unique designs, and fits that feel like they were made just for you.
          </p>
          <NavLink to="/products">
            <button>Shop Now</button>
          </NavLink>
        </div>
        <div className="hero-section-item">
          <img src="https://img.freepik.com/free-photo/dreamy-young-woman-sunglasses-looking-front_197531-16739.jpg?t=st=1734602088~exp=1734605688~hmac=84224e0e439163eaa5af404f67a7bc9bed337435d92eeb6a67bada6ce322f963&w=1060" />
        </div>
      </section>
    </Fragment>
  );
};
