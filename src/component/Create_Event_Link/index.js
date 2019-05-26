import React from 'react';
import * as ROUTE from '../../constants/routes'
import { withRouter } from "react-router-dom";

const CreateEventRedirectBase = ({history})=>(
    <button className="btn btn-default" onClick={()=> history.push(ROUTE.CREATE_EVENT)}>
      Create Event
    </button>
);

export const CreateEventRedirect = withRouter(CreateEventRedirectBase);
