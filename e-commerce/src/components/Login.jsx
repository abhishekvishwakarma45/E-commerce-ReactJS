import { Fragment, useCallback, useEffect, useState } from "react";
import useLoginContext from "../context/LoginContext";
import LoginToastNotification from "./LoginToastNotification";
import UnauthenticateUserToast from "./UnauthenticateUserToast";
import { NavLink } from "react-router-dom";
export const Login = () => {
  const { getToken } = useLoginContext();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [toast, setToast] = useState(false);
  const [Unauthenticated, setUnauthenticated] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToast = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  const validateUser = () => {
    setUnauthenticated(true);
    setTimeout(() => {
      setUnauthenticated(false);
    }, 3000);
  };
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:8999/login", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          throw new Error("Unauthenticated user");
        }

        const token = await response.text();
        localStorage.setItem("token", token);

        getToken();
        handleToast();
      } catch (error) {
        console.error("Login error:", error);
        validateUser();
      }
    },
    [credentials, getToken]
  );

  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <Fragment>
      {toast && <LoginToastNotification />}
      {Unauthenticated && <UnauthenticateUserToast />}
      <div className="formHeading">
        <h1>Login </h1>
      </div>
      <section className="full-height">
        <div className="container">
          <div className="content-wrapper">
            <div className="image-container">
              <img src="/Login.png" alt="Phone image" />
            </div>

            <div className="form-container">
              <form onSubmit={handleLogin}>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="email"
                    name="username"
                    value={credentials.username}
                    placeholder="Enter username"
                    className="form-input"
                    onChange={handleChange}
                  />
                </div>

                <div className="input-wrapper">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    className="form-input"
                    onChange={handleChange}
                  />
                </div>

                <div className="checkbox-wrapper">
                  <div>
                    <input
                      type="checkbox"
                      id="remember"
                      className="checkbox"
                      defaultChecked
                    />
                    <label className="checkbox-label">Remember me</label>
                  </div>
                  <a href="#!" className="link">
                    Forgot password?
                  </a>
                </div>

                <button type="submit" className="button-primary">
                  Sign in
                </button>

                <div className="divider">
                  <p>OR</p>
                </div>

                <a href="#!" className="social-button facebook">
                  Continue with Facebook
                </a>
                <a href="#!" className="social-button twitter">
                  Continue with X
                </a>
                <div className="redirect">
                  <p>
                    Not a Member?
                    <NavLink to="/register">
                      <span> Sign Up</span>
                    </NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
