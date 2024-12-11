import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

export default function SingleProduct() {
  const { id } = useParams();
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();
  console.log(singleProduct);

  const {
    id: alias,
    name,
    company,
    price,
    description,
    category,
    stock,
    stars,
    reviews,
  } = singleProduct;

  const API = `https://api.pujakaitem.com/api/products`;
  useEffect(() => {
    getSingleProduct(`${API}?id=${id}`);
  }, []);

  return (
    <Fragment>
      <h1>product name{name}</h1>
    </Fragment>
  );
}
