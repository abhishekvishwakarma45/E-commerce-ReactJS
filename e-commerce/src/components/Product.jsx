import { NavLink } from "react-router-dom";
import { FormatPrice } from "../Helpers/FormatPrice";
const Product = (current) => {
  const { id, name, image, category, price } = current;
  return (
    <NavLink to={`/singleproduct/${id}`}>
      <div className="feature-product">
        <div className="image-container">
          <p>{category}</p>
          <img src={image} alt="" />
        </div>
        <div className="product-content">
          <div>{name}</div>
          <div>{<FormatPrice price={price} />}</div>
        </div>
      </div>
    </NavLink>
  );
};
export default Product;
