import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";
import { SignOut } from "../SignOut";

export const WithAuthNavBarBase = props => {
  return (
    <React.Fragment>
      <li className="dropdown active">
        <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
      </li>
      <li className="dropdown active">
        <Link to={ROUTES.ADD_FRIEND}>Add Friend</Link>
      </li>
      <li className="dropdown active">
        <Link to={ROUTES.TERMS_CONDITIONS}>Terms and Conditions</Link>
      </li>
      <li className="dropdown active">
        <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
      </li>
      <li className="dropdown active">
        <Link to={ROUTES.EVENTS}>Events</Link>
      </li>
      <li className="dropdown active">
        <Link to={ROUTES.ACCOUNT_SETTINGS}>Account</Link>
      </li>
      <SignOut link={true} />
    </React.Fragment>
  );
};

export const WithAuthNavBar = withFirebase(WithAuthNavBarBase);
