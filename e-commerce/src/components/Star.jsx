import { Fragment } from "react";
import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa"; // Importing all icons from the same source

export const Star = ({ rating, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (current, index) => {
    let number = index + 0.5;
    return (
      <span key={index} className="star">
        {rating >= index + 1 ? (
          <FaStar />
        ) : rating >= number ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
    );
  });

  return (
    <Fragment>
      <div className="star-rating">
        <div className="stars">{ratingStar}</div>
        <p className="reviews">{reviews} reviews</p>
      </div>
    </Fragment>
  );
};
