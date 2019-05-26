import React from "react";
import { AddressForm } from "../Address_Form";

export const AddFriendForm = props => {
  const { email, error , address, name } = props.formInputs;
  
  const isDisabled = email === "" || address === "";

  return (
      <div className="span12">
      <div className="span6">
        <form onSubmit={props.onSubmit}>
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
            <label htmlFor="email">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={props.onChange}
            />
          </div>
          <button
            disabled={isDisabled}
            type="submit"
            className="btn btn-default"
          >
            Add Friend
          </button>
          {error ? <p>{error}</p> : <p />}
          </form>
          </div>
          <div className="span4">
        <AddressForm />
        </div>
      </div>
  );
};
