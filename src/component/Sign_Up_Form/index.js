  import React from "react";
  // import { AddressForm } from "../Address_Form";

  export const SignUpForm = props => {
    const { username, email, passwordOne, passwordTwo, error,
      //  address 
      } = props.formInputs;

    const isDisabled =
      email === "" ||
      passwordOne === "" ||
      passwordTwo === "" ||
      username === "" ||
      passwordOne !== passwordTwo ;
      // || address === "";
 
    return (
      <div className="form-wrapper">
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
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={props.onChange}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="passwordOne"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                value={passwordOne}
                onChange={props.onChange}
              />
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                name="passwordTwo"
                value={passwordTwo}
                onChange={props.onChange}
              />
            <button
              disabled={isDisabled}
              type="submit"
              className="login-button"
            >
              Sign Up
            </button>
            {error ? <p>{error.message}</p> : <p />}
            </div>
          </form>
        </div>
    );
  };
