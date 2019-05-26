import React from "react";
import {AddressForm} from '../Address_Form';

export const EditEventForm = props => {

  
  const {
    summary,
    description,
    startDate,
    endDate,
    location,
    error,
    attendees
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
            <input
              type="text"
              name="startDate"
              required
              pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
              title="Enter a date in this format YYYY-MM-DD"
              placeholder="YYYY-MM-DD"
              value={startDate}
              onChange={props.onChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="end-date">
            End Date:
            <input
              type="text"
              placeholder="YYYY-MM-DD"
              required
              pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
              title="Enter a date in this format YYYY-MM-DD"
              name="endDate"
              value={endDate}
              onChange={props.onChange}
            />
          </label>
        </div><div className="form-group">
          <label htmlFor="end-date">
            Location:
          </label>
            <input
              type="text"
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
