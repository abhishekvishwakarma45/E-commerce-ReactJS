import { RxCross2 } from "react-icons/rx";

import "animate.css";
const UnauthenticateUserToast = () => {
  return (
    <div className="ease-in toast-container animate__animated animate__fadeIn animate__fast ">
      <div id="toast-simple" className="toast invalid" role="alert">
        <div className="icon-wrapper">
          <RxCross2 />
        </div>
        <div className="message-wrapper">
          <p className="message">Invalid Username or Password</p>
        </div>
      </div>
    </div>
  );
};

export default UnauthenticateUserToast;
