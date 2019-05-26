import React from "react";
import { AddressForm } from "../Address_Form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const EventForm = props => {
  const {
    summary,
    description,
    startDate,
    endDate,
    timeZone,
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
              required
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
              required
              value={description}
              onChange={props.onChange}
              placeholder="Description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="start-date">Start Date:</label>
            <DatePicker
              showTimeSelect
              name="startDate"
              onChange={props.handleStartDate}
              timeFormat="HH:mm"
              selected={startDate}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-date">End Date:</label>
            <DatePicker
              showTimeSelect
              name="endDate"
              selected={endDate}
              timeFormat="HH:mm"
              onChange={props.handleEndDate}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          <div className="form-group">
            <label htmlFor="attendees">Attendees:</label>
            <ul>
              {attendees.map((item, index) => {
                return (
                  <div key={index}>
                    <li >{item["email"]}</li>
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
            // disabled={isDisabled}
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
