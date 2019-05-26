import React from "react";
import * as ROUTES from "../../constants/routes";
import { FacebookLogin } from "../Facebook_SignIn";
import { GoogleLogin } from "../Google_SignIn";

import { Link } from "react-router-dom";

export const SignInForm = props => {
  const { email, password, error } = props.formInputs;

  const isDisabled = email === "" || password === "";

  return (
    <div className="form-wrapper">
      <form onSubmit={props.onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address:
          <input
            type="email"
            name="email"
            value={email}
            onChange={props.onChange}
            placeholder="Email"
          />
          </label>
            <label htmlFor="pwd">Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={props.onChange}
            placeholder="Password"
          />
          </label>
        <button disabled={isDisabled} type="submit" className="login-button">
          Sign In
        </button>
        {error ? <p>{error.message}</p> : <p />}

        <GoogleLogin />
        <FacebookLogin />
        <div>
          <div>
            Not a User? <Link to={ROUTES.SIGNUP}>Sign Up</Link>
          </div>
          <div>
            <Link to={ROUTES.FORGET_PASSWORD}>Forgot Password?</Link>
          </div>
        </div>
        </div>
      </form>
    </div>
  );
};
