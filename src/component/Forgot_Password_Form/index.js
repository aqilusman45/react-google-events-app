import React from "react";
import "./styles.css";

export const ForgotPasswordForm = props => {
  const { email, error, onSuccess } = props.formInputs;

  const isDisabled = email === "";

  return (
    <div className="form-wrapper">
      <form onSubmit={props.onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={props.onChange}
              />
            </div>
        <div>
        <button disabled={isDisabled} type="submit" className="login-button">          
          Submit
          </button>
        </div>
      </form>
      {error ? <p>{error.message}</p> : <p>{onSuccess}</p>}
    </div>
  );
};
