import { useCartContext } from "../context/CartContext";

export default function CartProduct(current) {
  const { removeProduct } = useCartContext();
  const { id, image, name, color, price, quantity } = current;
  // console.log(current.id);
  return (
    <li className="product-item">
      <div className="product-image">
        <img
          src={image}
          alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
        />
      </div>

      <div className="product-details">
        <div className="product-info">
          <h3>
            <a href="#">{name}</a>
          </h3>
          <p className="product-price">{price}</p>
        </div>
        <span>Color:</span>
        <p
          className="product-color"
          style={{ backgroundColor: ` ${color}` }}
        ></p>
        <div className="product-actions">
          <p className="product-quantity">Quantiy:{quantity}</p>
          <button
            type="button"
            className="remove-button"
            onClick={() => removeProduct(id)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
