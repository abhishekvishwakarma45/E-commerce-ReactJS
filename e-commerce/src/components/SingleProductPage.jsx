import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { Star } from "./Star";
import { FormatPrice } from "../Helpers/FormatPrice";
import { useCartContext } from "../context/CartContext";
import { FaCheck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function SingleProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [clr, setColor] = useState(null);

  const { id } = useParams();
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();

  useEffect(() => {
    getSingleProduct(`http://localhost:8081/product/get/${id}`);
  }, [getSingleProduct, id]);

  const {
    name,
    company,
    price,
    description,
    category,
    stock,
    rating,
    reviews,
    image,
    color = [],
  } = singleProduct || {};

  const { AddToCart } = useCartContext();

  useEffect(() => {
    if (color.length > 0) {
      setColor(color[0]);
    }
  }, [color]);

  if (isSingleLoading) {
    return (
      <div className="spin-loader">
        <span className="loader"></span>
      </div>
    );
  }

  if (!singleProduct) {
    return <h1>No product data available</h1>;
  }

  return (
    <Fragment>
      <div className="grid items-center justify-center single-product-section md:grid lg:flex">
        <div className="grid product-image-section ">
          <div className="main-img-container">
            <figure>
              <img src={image} alt="Main Product Image" />
            </figure>
          </div>
        </div>

        <div className="single-product-content">
          <h1 className="text-2xl font-bold product-name">{name}</h1>
          <p className="text-sm text-gray-600 product-company">by {company}</p>
          <p className="text-sm text-gray-600 product-category">
            Category: {category}
          </p>
          <p className="text-lg font-semibold text-green-600 product-price">
            <FormatPrice price={price} />
          </p>
          <p className="text-base text-gray-800 product-description">
            {description}
          </p>
          <p className="text-sm font-medium text-gray-600 product-stock">
            {stock > 0 ? `In stock` : "Out of stock"}
          </p>
          <div className="text-sm product-reviews">
            <div>
              <Star rating={rating} reviews={reviews} />
            </div>
          </div>
          <div>
            <div>
              <p>Select Colors:</p>
              <div className="color-buttons-container">
                {color.length === 0 ? (
                  <p>No colors available</p>
                ) : (
                  color.map((current, index) => (
                    <button
                      key={index}
                      className={`color-button ${
                        clr === current ? "selected" : ""
                      }`}
                      style={{ backgroundColor: current }}
                      onClick={() => setColor(current)}
                    >
                      {clr === current && <FaCheck />}
                    </button>
                  ))
                )}
              </div>
              <div className="inc-dec-btn-container">
                <button
                  className="inc-dec-btn"
                  onClick={() =>
                    setQuantity(quantity < stock ? quantity + 1 : quantity)
                  }
                >
                  <FaPlus />
                </button>
                <h3 className=" quantity">{quantity}</h3>
                <button
                  className="inc-dec-btn"
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  <FaMinus />
                </button>
              </div>
              <div>
                <NavLink to="/cart">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => AddToCart(id, clr, quantity, singleProduct)}
                  >
                    Add To Cart
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
