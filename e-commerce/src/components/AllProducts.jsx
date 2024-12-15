import { Fragment, useState } from "react";

import { Footer } from "./Footer";
import useFilterContext from "../context/FilterContext";
import Product from "./Product";
import { IoFilter } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
export default function Products() {
  const [color, setColor] = useState();
  const [transform, setTransform] = useState("-100%");
  const {
    allProducts,
    filterProducts,
    SortingFn,
    updateFilterValue,
    filter: { text },
  } = useFilterContext();

  const getUniqueData = (data, property) => {
    let newVal = data.map((current) => {
      return current[property];
    });
    if (property === "colors") {
      return (newVal = ["all", ...new Set([].concat(...newVal))]);
      //to do the same thing we have Array.flat method
      // newVal = newVal.flat();
    }
    return (newVal = ["All", ...new Set(newVal)]);
  };

  const categoryData = getUniqueData(allProducts, "category");
  const DataByCompany = getUniqueData(allProducts, "company");
  const colorData = getUniqueData(allProducts, "colors");

  return (
    <Fragment>
      <div className="allProductContainer">
        <div className="allProducts">
          <div className="sorting-div">
            <button className="filter-btn" onClick={() => setTransform("0%")}>
              {<IoFilter />} <span>Filter</span>{" "}
            </button>
            <p>{filterProducts.length} Products available</p>
            <select name="sort" id="sort" className="sort" onClick={SortingFn}>
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

      <div
        className="filter-section"
        style={{ transform: `translate(${transform})` }}
      >
        <div className="search-bar">
          <input
            type="text"
            name="text"
            placeholder="Search here...."
            className="search"
            id="text"
            value={text}
            onChange={updateFilterValue}
          />
        </div>
        <div className="filter-category">
          <div>
            {categoryData.map((current, index) => {
              return (
                <button
                  key={index}
                  name="category"
                  value={current}
                  onClick={updateFilterValue}
                >
                  {current}
                </button>
              );
            })}
          </div>
        </div>

        <div className="filterByBrand">
          <select name="company" id="company" onChange={updateFilterValue}>
            {DataByCompany.map((current, index) => {
              return (
                <option name={current} key={index} value={current}>
                  {current}
                </option>
              );
            })}
          </select>
        </div>

        <div className="color-filter-section">
          {colorData.map((current, index) => {
            return (
              <button
                name="colors"
                key={index}
                value={current}
                onClick={(event) => {
                  updateFilterValue(event), setColor(current);
                }}
                style={{ backgroundColor: `${current}` }}
              >
                {color === current ? <FaCheck /> : ""}
              </button>
            );
          })}
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}
