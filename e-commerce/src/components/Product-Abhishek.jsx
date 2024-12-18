import { NavLink } from "react-router-dom";
import { FormatPrice } from "../Helpers/FormatPrice";

const Product = (current) => {
  const { id, name, image, category, price } = current;
  return (
    <NavLink to={`/singleproduct/${id}`} className="product-card">
      <div className="product-card__image-container">
        <img src={image} alt={name} className="product-card__image" />
        <div className="product-card__category">{category}</div>
      </div>
      <div className="product-card__details">
        <div className="product-card__name">{name}</div>
        <div className="product-card__price">
          <FormatPrice price={price} />
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
