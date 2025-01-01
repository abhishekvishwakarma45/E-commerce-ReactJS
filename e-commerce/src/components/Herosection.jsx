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
            Welcome to <span className="">E-commerce Store</span>
          </p>
          <p className="content-paragraph">
            Your ultimate shopping destination! From the latest tech gadgets to
            fashion, home goods, and everything in between, we’ve got it all.
            Shop millions of products from trusted brands, all at unbeatable
            prices. <br />
            Endless Selection, One Place Whether you're upgrading your home,
            refreshing your wardrobe, or finding the perfect gift, we offer a
            vast range of categories to suit every need and style. Browse, shop,
            and discover products that make life easier, better, and more
            exciting.
            <br />
            Fast, Convenient, Reliable Enjoy fast shipping easy returns, and
            top-notch customer service. Shop with confidence knowing that we’re
            here to make your shopping experience simple and enjoyable. Start
            Shopping Now Browse our top categories and find exactly what you
            need. From electronics to fashion, we’ve got something for everyone!
          </p>
          <NavLink to="/products">
            <button>Shop Now</button>
          </NavLink>
        </div>
        <div className="hero-section-item">
          <img src="/hero-image.png" />
        </div>
      </section>
    </Fragment>
  );
};
