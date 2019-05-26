import React from "react";

export const CalendarForm = props => {
  const { summary, description, error } = props.formInputs;

  const isDisabled = summary === "";

  return (
    <div className="span6 offset2">
      <form onSubmit={props.onSubmit}>
        <div className="form-group">
          <label htmlFor="summary">Calendar Title:</label>
          <input
            type="text"
            name="summary"
            value={summary}
            onChange={props.onChange}
            placeholder="Title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={props.onChange}
            placeholder="Description"
          />
        </div>
        <button disabled={isDisabled} type="submit" className="btn btn-default">
          Add Calendar
        </button>
        {error ? <p>{error.message}</p> : <p />}
      </form>
    </div>
  );
};
