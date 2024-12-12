import { Fragment } from "react";
import { useProductContext } from "../context/ProductContext";
import Product from "./Product";

const FeatureProducts = () => {
  const { isLoading, featureProducts } = useProductContext();

  if (isLoading) {
    return <h1>loading....</h1>;
  }

  return (
    <Fragment>
      <div className="feature-heading-container">
        <h2>New Arrivals</h2>
        <h1>Featured Products</h1>
      </div>
      <div className="feature-Product-container grid md:grid  lg:flex justify-center items-center ">
        {featureProducts.map((current) => {
          return <Product key={current.id} {...current} />;
        })}
      </div>
    </Fragment>
  );
};

export default FeatureProducts;
