import React from "react";
import { AddressForm } from "../Address_Form";

export const EventForm = props => {
  const {
    summary,
    description,
    startDate,
    endDate,
    error,
    attendees
  } = props.formInputs;

  const isDisabled = summary === "" || description === "";

  // const calendarValid = attendeeEmail === "";

  return (
    <div className="span12">
      <div className="span6">
        <form onSubmit={props.onSubmit}>
          <div className="form-group">
            <label htmlFor="summary">Event Title:</label>
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
          <div className="form-group">
            <label htmlFor="start-date">Start Date:</label>
            <input
              type="text"
              name="startDate"
              required
              pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
              title="Enter a date in this format YYYY-MM-DD"
            placeholder="YYYY-MM-DD" value={startDate}
            onChange={props.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-date">End Date:</label>
            <input
              type="text"
              placeholder="YYYY-MM-DD"
              required
              pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
              title="Enter a date in this format YYYY-MM-DD"
            name="endDate" value={endDate}
            onChange={props.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="attendees">Attendees:</label>
            <ul>
              {attendees.map((item, index) => {
                return (
                  <div>
                    <li key={index}>{item["email"]}</li>
                    <button
                      onClick={event => props.removeEmail(event, index)}
                      className="btn btn-default"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </ul>
          </div>
          <button
            disabled={isDisabled}
            type="submit"
            className="btn btn-default"
          >
            Add Event
          </button>
          {error ? <p>{error}</p> : <p />}
        </form>
      </div>
      <div className="span6">
        <AddressForm />
      </div>
    </div>
  );
};
