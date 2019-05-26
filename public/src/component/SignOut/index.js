import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTE from "../../constants/routes";
import { Link } from "react-router-dom";
import { withCalendar } from "../Calendar_Functions";
const SignOutButton = ({ history, firebase, gapi, link }) => {
  return (
    <li className="dropdown active">
      {link ? (
        <Link
          onClick={() => {
            firebase.doSignOut().then(() => {
              gapi.doSignOut();
            });
            history.push(ROUTE.LANDING);
          }}
          to={ROUTE.LANDING}
        >Sign Out</Link>
      ) : (
        <button
          type="button"
          onClick={() => {
            firebase.doSignOut().then(() => {
              gapi.doSignOut();
            });
            history.push(ROUTE.LANDING);
          }}
        >
          Sign Out
        </button>
      )}
    </li>
  );
};

export const SignOut = withRouter(withFirebase(withCalendar(SignOutButton)));
