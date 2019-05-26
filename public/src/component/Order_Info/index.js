import React from 'react';

export const  OrderInfo = (props) =>{
    const {date , time} = props.formInputs
    return (
        <div>
            <h4>
            Delivery Date / Time
            </h4>
            <div className="form-group">
              <label htmlFor="Date">Date</label>
              <input
                type="date"
                name="date"
                required
                value={date}
                onChange={props.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Time</label>
              <input
                type="time"
                name="time"
                value={time}
                required
                onChange={props.onChange}
              />
            </div>
        </div>
    )
}