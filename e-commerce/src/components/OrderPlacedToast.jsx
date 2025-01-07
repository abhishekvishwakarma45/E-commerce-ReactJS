import { FaCheck } from "react-icons/fa6";

import "animate.css";
const OrderPlacedToast = () => {
  return (
    <div className="ease-in toast-container animate__animated animate__fadeIn animate__fast ">
      <div id="toast-simple" className="toast" role="alert">
        <div className="icon-wrapper">
          <FaCheck />
        </div>
        <div className="message-wrapper">
          <p className="message">Order Placed Successfully</p>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacedToast;
