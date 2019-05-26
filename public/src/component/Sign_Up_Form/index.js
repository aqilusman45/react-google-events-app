  import React from "react";
  import { AddressForm } from "../Address_Form";

  export const SignUpForm = props => {
    const { username, email, passwordOne, passwordTwo, error, address } = props.formInputs;

    const isDisabled =
      email === "" ||
      passwordOne === "" ||
      passwordTwo === "" ||
      username === "" ||
      passwordOne !== passwordTwo ||
      address === "";

    return (
      <div className="row">
        <div className="span4 offset2">
          <form onSubmit={props.onSubmit}>
            <div className="form-group">
              <label htmlFor="username">User Name:</label>
              <input
                type="username"
                name="username"
                pattern="[^' ']+"
                title="No Spaces are Allowed"
                value={username}
                onChange={props.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={props.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="passwordOne"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                value={passwordOne}
                onChange={props.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                name="passwordTwo"
                value={passwordTwo}
                onChange={props.onChange}
              />
            </div>
            <button
              disabled={isDisabled}
              type="submit"
              className="btn btn-default"
            >
              Sign Up
            </button>
            {error ? <p>{error.message}</p> : <p />}
          </form>
        </div>
        <div className="span4">
        <AddressForm />
        </div>
      </div>
    );
  };
