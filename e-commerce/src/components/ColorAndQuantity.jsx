// import { Fragment, useState } from "react";
// import { FaCheck } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa";
// import { FaMinus } from "react-icons/fa6";
// import { NavLink } from "react-router-dom";
// import { useCartContext } from "../context/CartContext";

// export const ColorAndQuantity = ({ singleProduct }) => {
//   const { colors = [] } = singleProduct;
//   const { id, stock } = singleProduct;
//   const [quantity, setQuantity] = useState(1);
//   const [color, setColor] = useState(colors[0]);

//   const { AddToCart } = useCartContext();
//   if (colors.length === 0) {
//     return <p>No colors available</p>;
//   }

//   return (
//     <Fragment>
//       <div>
//         <p>Select Colors:</p>
//         <div className="color-buttons-container">
//           {colors.map((current, index) => (
//             <button
//               key={index}
//               className={`color-button ${color === current ? "selected" : ""}`}
//               style={{ backgroundColor: current }}
//               onClick={() => setColor(current)}
//             >
//               {color === current && <FaCheck />}{" "}
//             </button>
//           ))}
//         </div>
//         <div className="inc-dec-btn-container">
//           <button
//             className="inc-dec-btn"
//             onClick={() =>
//               setQuantity(quantity <= stock ? quantity + 1 : quantity)
//             }
//           >
//             <FaPlus />
//           </button>
//           <h3 className=" quantity">{quantity}</h3>
//           <button
//             className="inc-dec-btn"
//             onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
//           >
//             <FaMinus />
//           </button>
//         </div>
//         <div>
//           <NavLink
//             to="/cart"
//             onClick={() => AddToCart(id, color, quantity, singleProduct)}
//           >
//             <button className="add-to-cart-btn">Add To Cart</button>
//           </NavLink>
//         </div>
//       </div>
//     </Fragment>
//   );
// };
