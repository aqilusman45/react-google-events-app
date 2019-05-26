import React from "react";

export const CreditCard = props => {
  const { name, number, month, year, ccv } = props.formInputs;
  return (
    <div>
      <h4>Payment Info</h4>
      <div className="form-group">
        <label htmlFor="name">Name</label>

        <input type="text" name="name" value={name} onChange={props.onChange} />
      </div>
      <div className="form-group">
        <label htmlFor="number">Number</label>

        <input
          type="text"
          name="number"
          required
          value={number}
          maxLength="16"
          onChange={props.onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="month day">Expiration Month / Year</label>

        <input
          type="text"
          name="month"
          value={month}
          maxLength="2"
          required
          onChange={props.onChange}
        />
        <input
          type="text"
          name="year"
          value={year}
          maxLength="2"
          required
          onChange={props.onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="ccv">ccv</label>

        <input
          type="text"
          name="ccv"
          value={ccv}
          maxLength="3"
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};
