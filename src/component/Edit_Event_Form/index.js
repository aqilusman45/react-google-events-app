import React from "react";
import {AddressForm} from '../Address_Form';
import DatePicker from "react-datepicker";

export const EditEventForm = props => {

  
  const {
    summary,
    description,
    startDate,
    endDate,
    location,
    error,
    attendees,
  } = props.formInputs;



  const isDisabled =
    summary === "" ||
    description === "";


  // const calendarValid = attendeeEmail === "";
  
  return (
    <div className="row-fluid">
    <div className="span6">

      <form onSubmit={props.onSubmit}>
        <div className="form-group">
          <label htmlFor="summary">
            Event Title:
            <input
              type="text"
              name="summary"
              value={summary}
              onChange={props.onChange}
              placeholder="Title"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="description">
            Description:
            <input
              type="text"
              name="description"
              value={description}
              onChange={props.onChange}
              placeholder="Description"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="start-date">
            Start Date:
            <DatePicker
              showTimeSelect
              name="startDate"
              onChange={props.handleStartDate}
              selected={startDate}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="end-date">
            End Date:
            <DatePicker
              showTimeSelect
              name="endDate"
              selected={endDate}
              onChange={props.handleEndDate}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </label>
        </div><div className="form-group">
          <label htmlFor="end-date">
            Location:
          </label>
            <input
              type="datetime"
              placeholder="location"
              name="location"
              readOnly
              value={location}
            />
        </div>
        <div className="form-group">
        Attendees:
          <ul>
            {
            attendees ? 
            attendees.map((item, index) => {
              return (
                <div key={index + 1}>
                  <li key={index}>{item["email"]}</li>
                  <button onClick={(event)=>props.removeEmail(event,index)} className="btn btn-default">
                    Remove
                  </button>
                </div>
              );
            }) : null
            
            }
          </ul>
        </div>
        <button disabled={isDisabled} type="submit" className="btn btn-default">
        Update Event
        </button>
        {error ? <p>{error}</p> : <p />}
      </form>
      </div>
      <div className="span6">
      <AddressForm/>

      </div>
    </div>
  );
};
