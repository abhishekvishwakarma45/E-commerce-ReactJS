const Product = (current) => {
  const { id, name, image, category, price } = current;
  return (
    <div className="feature-product">
      <div className="image-container">
        <p>{category}</p>
        <img src={image} alt="" />
      </div>
      <div className="product-content">
        <div>{name}</div>
        <div>{price}</div>
      </div>
    </div>
  );
};
export default Product;
