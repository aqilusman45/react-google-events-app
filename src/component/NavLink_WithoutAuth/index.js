import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export const WithoutAuthNavBar = () => {
  return (
    <React.Fragment>
      <li className="dropdown active">
        <Link to={ROUTES.LANDING}>Home</Link>
      </li>
      <li className="dropdown active">
        <Link to={ROUTES.SIGNIN}>Sign In</Link>
      </li>
    </React.Fragment>
  );
};
