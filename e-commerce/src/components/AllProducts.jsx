import { Fragment } from "react";

import { Footer } from "./Footer";
import useFilterContext from "../context/FilterContext";
import Product from "./Product";
import { IoFilter } from "react-icons/io5";
export default function Products() {
  const { filterProducts, Sorting } = useFilterContext();
  console.log(filterProducts);

  return (
    <Fragment>
      <div className="allProductContainer">
        <div className="allProducts">
          <div className="sorting-div">
            <button className="filter-btn">
              {<IoFilter />} <span>Filter</span>{" "}
            </button>
            <p>{filterProducts.length} Products available</p>
            <select name="sort" id="sort" className="sort" onClick={Sorting}>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
          <div className="all-product-container">
            {filterProducts.map((current) => {
              return <Product key={current.id} {...current} />;
            })}
          </div>
        </div>
      </div>

      <div className="filter-section"></div>

      <Footer />
    </Fragment>
  );
}
