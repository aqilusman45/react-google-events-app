import React from "react";

export const EventInfo = props => {
  const {
    creator,
    summary,
    description,
    start,
    end,
    htmlLink,
    location,
    attendees
  } = props.formInputs;
  return (
    <div className="h-75">
      <h4>Event Info</h4>
      <div>
        <p>Title: {summary}</p>
      </div>
      <div>
        <p>Description: {description}</p>
      </div>
      <div>
        <p>Created by:{creator.email}</p>
      </div>
      <div>
        <p>Starting : {start.date}</p>
      </div>
      <div>
        <p>End: {end.date}</p>
      </div>
      <div>
        <p>Location: {location}</p>
      </div>
      <div>
          <p>Guests</p>
        <ul>
          {attendees? attendees.map((item, index) => {
            return <li key={index}>{item.email}</li>;
          }): null}
        </ul>
      </div>
      <div>
        <a href={htmlLink}>View on Google Calendar</a>
      </div>
    </div>
  );
};
