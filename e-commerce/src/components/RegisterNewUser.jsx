import { Fragment } from "react";
import { useState } from "react";
import RegisterToast from "./RegisterToast";

import { NavLink } from "react-router-dom";

export const RegisterNewUser = () => {
  const [toast, setToast] = useState(false);

  const [credentials, setCredentials] = useState({});

  const HandleCredentials = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const showToast = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await fetch("http://localhost:8999/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Internal server error");
    } else {
      showToast();
    }
  };

  return (
    <Fragment>
      {toast && <RegisterToast />}

      <div className="formHeading">
        <h1>Sign Up </h1>
      </div>
      <section className="full-height">
        <div className="container">
          <div className="content-wrapper">
            <div className="image-container">
              <img src="/signup.png" alt="Phone image" />
            </div>

            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={credentials.firstname}
                    placeholder=" First Name"
                    className="form-input"
                    onChange={HandleCredentials}
                  />
                </div>

                <div className="input-wrapper">
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={credentials.lastname}
                    placeholder="Last Name"
                    className="form-input"
                    onChange={HandleCredentials}
                  />
                </div>

                <div className="input-wrapper">
                  <input
                    type="number"
                    id="mobile"
                    name="mobile"
                    value={credentials.mobile}
                    placeholder="Mobile"
                    className="form-input"
                    onChange={HandleCredentials}
                  />
                </div>

                <div className="input-wrapper">
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={credentials.birthdate}
                    placeholder="Birthdate"
                    className="form-input"
                    onChange={HandleCredentials}
                  />
                </div>

                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="username"
                    value={credentials.email}
                    placeholder="E-mail"
                    className="form-input"
                    onChange={HandleCredentials}
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
                    onChange={HandleCredentials}
                  />
                </div>

                <div className="redirect">
                  <p>
                    Already a Member ?{" "}
                    <NavLink to="/login">
                      <span>Log in</span>
                    </NavLink>
                  </p>
                </div>

                <button type="submit" className="button-primary">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
