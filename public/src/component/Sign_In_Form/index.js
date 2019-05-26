import React from "react";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

export const SignInForm = props => {
  const { email, password, error } = props.formInputs;

  const isDisabled = email === "" || password === "";

  return (
    <div className="span6 offset2">
      <form onSubmit={props.onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={props.onChange}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={props.onChange}
            placeholder="Password"
          />
        </div>
        <button disabled={isDisabled} type="submit" className="btn btn-default">
          Sign In
        </button>
        {error ? <p>{error.message}</p> : <p />}
        <div>
          <div>
            <div>
              Not a User? <Link to={ROUTES.SIGNUP}>Sign Up</Link>
            </div>
          </div>
          <div>
            <div>
              <Link to={ROUTES.FORGET_PASSWORD}>Forgot Password?</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
