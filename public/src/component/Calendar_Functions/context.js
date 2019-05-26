import React from 'react';

const CalendarContext = React.createContext(null);

const withCalendar = (Component) => props => {
    return (
        <CalendarContext.Consumer>
            {
                gapi => <Component {...props} gapi={gapi} />
            }
        </CalendarContext.Consumer>
    )
}

export {CalendarContext, withCalendar};