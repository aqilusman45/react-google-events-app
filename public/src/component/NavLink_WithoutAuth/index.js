import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export const WithoutAuthNavBar = () => {
  return (
    <React.Fragment>
      <li className="dropdown active">
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li className="dropdown active">
        <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
      </li>
      <li className="dropdown active">
        <Link to={ROUTES.TERMS_CONDITIONS}>Terms and Conditions</Link>
      </li>
      <li className="dropdown active">
        <Link to={ROUTES.SIGNIN}>Sign In</Link>
      </li>
    </React.Fragment>
  );
};
