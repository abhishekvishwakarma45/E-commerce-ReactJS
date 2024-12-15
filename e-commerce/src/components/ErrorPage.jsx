import { Fragment } from "react";
import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  return (
    <Fragment>
      <main className="error-page-container">
        <div className="error-content">
          <p className="error-code">404</p>
          <h1 className="error-title">Page not found</h1>
          <p className="error-message">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="error-actions">
            <NavLink to="/">
              <a href="#" className="go-home-button">
                Go back home
              </a>
            </NavLink>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
