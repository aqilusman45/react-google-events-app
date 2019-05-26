import React from 'react';
import * as ROUTE from '../../constants/routes'
import { withRouter } from "react-router-dom";

const CreateCalendarRedirectBase = ({history})=>(
    <button className="btn btn-default" onClick={()=> history.push(ROUTE.CREATE_CALENDAR)}>
      Create Calendar
    </button>
);

export const CreateCalendarRedirect = withRouter(CreateCalendarRedirectBase);
