import React from 'react';
import { withAuthorization } from "../Session";
import {SubIntro} from '../Sub_Intro'
const DashboardBase = () =>(
    <div>
        <SubIntro heading="Dashboard"/>
    </div>
)

const condition = authUser => !!authUser;

const Dashboard = withAuthorization(condition)(DashboardBase);

export {Dashboard};