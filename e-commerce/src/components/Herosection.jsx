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
          <img src="https://img.freepik.com/free-photo/portrait-handsome-confident-model-sexy-stylish-man-dressed-checkered-shirt-jeans-fashion-hipster-male-posing-near-blue-wall-studio-isolated_158538-26328.jpg?t=st=1733734761~exp=1733738361~hmac=d753ea95d035ae596a408d1eaa5af3634e05a4c6f1e74375fa1551cf085463a1&w=1060" />
        </div>
      </section>
    </Fragment>
  );
};
