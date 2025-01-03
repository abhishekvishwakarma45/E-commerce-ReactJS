import { Fragment, useCallback, useEffect, useState } from "react";
import useLoginContext from "../context/LoginContext";

export const Login = () => {
  const { getToken } = useLoginContext();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        alert("You logged in successfully...");
        getToken();
      } catch (error) {
        console.error("Login error:", error);
        alert(error.message);
      }
    },
    [credentials, getToken]
  );

  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <Fragment>
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
