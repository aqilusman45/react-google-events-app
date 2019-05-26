import React from "react";

export const CalendarForm = props => {
  const { summary, description, error, timeZone } = props.formInputs;

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
        <div>
          <select name="timeZone" value={timeZone} onChange={props.onChange}>
            <option defaultValue value="America/New_York">America/New_York</option>
            <option value="UCT">UCT</option>
            <option value="US/Alaska">US/Alaska</option>
            <option value="US/Aleutian">US/Aleutian</option>
            <option value="US/Arizona">US/Arizona</option>
            <option value="US/Central">US/Central</option>
            <option value="US/East-Indiana">US/East-Indiana</option>
            <option value="US/Eastern">US/Eastern</option>
            <option value="US/Hawaii">US/Hawaii</option>
            <option value="US/Indiana-Starke">US/Indiana-Starke</option>
            <option value="US/Michigan">US/Michigan</option>
            <option value="US/Mountain">US/Mountain</option>
            <option value="US/Pacific">US/Pacific</option>
            <option value="US/Pacific-New">US/Pacific-New</option>
            <option value="US/Samoa">US/Samoa</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
        <button disabled={isDisabled} type="submit" className="btn btn-default">
          Add Calendar
        </button>
        {error ? <p>{error.message}</p> : <p />}
      </form>
    </div>
  );
};
