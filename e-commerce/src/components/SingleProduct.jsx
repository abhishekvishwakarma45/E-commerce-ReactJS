import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { Star } from "./Star";
import { FormatPrice } from "../Helpers/FormatPrice";
import { Color } from "./ProductColor";
export default function SingleProduct() {
  const { id } = useParams();
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();
  const [count, setCount] = useState(0);

  useEffect(() => {
    getSingleProduct(`${API}?id=${id}`);
  }, []);

  console.log(singleProduct);

  const {
    name,
    company,
    price,
    description,
    category,
    stock,
    stars,
    reviews,
    image = [],
  } = singleProduct || {};

  const API = `https://api.pujakaitem.com/api/products`;
  const [mainImage, setMainImage] = useState(image[0] || "");

  useEffect(() => {
    if (image.length > 0 && !mainImage) {
      setMainImage(image[0].url);
    }
  }, [image, mainImage]);

  if (isSingleLoading) {
    return <h1>Loading...</h1>;
  }

  if (!singleProduct) {
    return <h1>No product data available</h1>;
  }
  return (
    <Fragment>
      <div className="single-product-section grid md:grid lg:flex justify-center items-center">
        <div className="product-image-section grid  ">
          <div className="mini-image-container">
            {image.map((current, index) => {
              return (
                <figure key={index}>
                  <img
                    src={current.url}
                    alt="product images"
                    onClick={() => setMainImage(current.url)}
                  />
                </figure>
              );
            })}
          </div>
          <div className="main-img-container">
            <figure>
              <img src={mainImage} alt="Main Product Image" />
            </figure>
          </div>
        </div>

        <div className="single-product-content">
          <h1 className="product-name text-2xl font-bold">{name}</h1>
          <p className="product-company text-sm text-gray-600">by {company}</p>
          <p className="product-category text-sm text-gray-600">
            Category: {category}
          </p>
          <p className="product-price text-lg font-semibold text-green-600">
            <FormatPrice price={price} />
          </p>
          <p className="product-description text-base text-gray-800">
            {description}
          </p>
          <p className="product-stock text-sm font-medium text-gray-600">
            {stock > 0 ? `In stock` : "Out of stock"}
          </p>
          <div className="product-reviews text-sm">
            <p>
              <Star stars={stars} reviews={reviews} />
            </p>
          </div>
          <div className="flex text-center items-center ">
            <button className="inc-dec-btn" onClick={() => setCount(count + 1)}>
              +
            </button>
            <h1 className="font-bold text-xl text-center"> {count}</h1>
            <button
              className="inc-dec-btn"
              onClick={() => setCount(count > 0 ? count - 1 : 0)}
            >
              -
            </button>
          </div>
          <div>
            <Color singleProduct={singleProduct} />
          </div>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </Fragment>
  );
}
