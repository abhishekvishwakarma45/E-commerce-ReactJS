import { Fragment, useState } from "react";
import { FaCheck } from "react-icons/fa";

export const Color = ({ singleProduct }) => {
  const { colors = [] } = singleProduct;
  const [color, setColor] = useState(colors[0]);

  if (colors.length === 0) {
    return <p>No colors available</p>;
  }

  return (
    <Fragment>
      <p>Select Colors:</p>
      <div className="color-buttons-container">
        {colors.map((current, index) => (
          <button
            key={index}
            className={`color-button ${color === current ? "selected" : ""}`}
            style={{ backgroundColor: current }}
            onClick={() => setColor(current)}
          >
            {color === current && <FaCheck />}{" "}
          </button>
        ))}
      </div>
    </Fragment>
  );
};
