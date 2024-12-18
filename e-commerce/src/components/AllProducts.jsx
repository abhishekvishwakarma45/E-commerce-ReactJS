import { Fragment, useEffect, useState } from "react";

import { Footer } from "./Footer";
import useFilterContext from "../context/FilterContext";
import Product from "./Product";
import { IoFilter } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FormatPrice } from "../Helpers/FormatPrice";

export default function Products() {
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [color, setColor] = useState();
  const [transform, setTransform] = useState("-100%");

  const {
    allProducts,
    filterProducts,
    SortingFn,
    updateFilterValue,
    filter: { text, price },
    clearFilter,
  } = useFilterContext();

  const getUniqueData = (data, property) => {
    let newVal = data.map((current) => {
      return current[property];
    });
    if (property === "colors") {
      return (newVal = ["all", ...new Set([].concat(...newVal))]);
    }
    if (property === "price") {
      return (newVal = [...new Set(newVal)]);
    }

    return (newVal = ["All", ...new Set(newVal)]);
  };

  let priceData = getUniqueData(allProducts, "price");

  const setPrice = () => {
    const minimumPrice = Math.min(...priceData);
    setMinPrice(minimumPrice);

    const maximumPrice = Math.max(...priceData);
    setMaxPrice(maximumPrice);
  };

  const categoryData = getUniqueData(allProducts, "category");
  const DataByCompany = getUniqueData(allProducts, "company");
  const colorData = getUniqueData(allProducts, "colors");
  useEffect(() => {
    setPrice();
  }, [getUniqueData]);

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
      <hr />

      <div
        className="filter-section"
        style={{ transform: `translate(${transform})` }}
      >
        <div className="cross-btn">
          <button onClick={() => setTransform("-100%")}>
            <ImCross />
          </button>
        </div>
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
                  <p> {current}</p>
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
          <p>Color:</p>
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

        <div className="range-section">
          <FormatPrice price={parseInt(price)} />
          <br />

          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            name="price"
            value={price}
            onChange={updateFilterValue}
          />
        </div>

        <div>
          <button name="clear" className="clear-btn" onClick={clearFilter}>
            Clear
          </button>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}
