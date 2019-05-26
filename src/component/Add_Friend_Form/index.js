import React from "react";
import { AddressForm } from "../Address_Form";

export const AddFriendForm = props => {
  const { email, error, address, name } = props.formInputs;

  const isDisabled = email === "" || address === "";

  return (
    <form onSubmit={props.onSubmit}>
      <div className="addressitem">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="addressitem">
        <div className="form-group">
          <label htmlFor="email">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={props.onChange}
          />
        </div>
      </div>
      <AddressForm />
      <div className="addressitem">
      <button disabled={isDisabled} type="submit" className="btn btn-default">
        Add Friend
      </button>
      </div>
      {error ? <p>{error}</p> : <p />}
    </form>
  );
};
