import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { withAuthentication } from "../Session";
import * as ROUTE from "../../constants/routes";

import { Landing } from "../Landing_Page";
import { SignIn } from "../Sign_In";
import { SignUp } from "../Sign_Up";
import { AccountSettings } from "../Account_Settings";
import { Dashboard } from "../Dashboard";
import { Navigation } from "../Navigation";
import { ForgotPassword } from "../Forgot_Password";
import { Footer } from "../Footer";
import { Events } from "../Events";
import { PrivacyPolicy } from "../Privacy-Policy";
import { TermsConditions } from "../Terms_Conditions";
import { CreateCalendar } from "../Create_Calendar"
import { CreateEvent } from "../Create_Event";
import { EventDetails } from "../Event_Details";
import {AddFriends} from "../Add_Friends"
import { EditEvent } from "../Edit_Event";
import { Checkout } from "../Checkout";


class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navigation />
          <Route path={ROUTE.LANDING} exact component={Landing} />
              <Route path={ROUTE.SIGNIN} exact component={SignIn} />
              <Route path={ROUTE.SIGNUP} exact component={SignUp} />
              <Route path={ROUTE.DASHBOARD} exact component={Dashboard} />
              <Route path={ROUTE.EVENTS} exact component={Events} />
              <Route path={ROUTE.ACCOUNT_SETTINGS} exact component={AccountSettings} />
              <Route path={ROUTE.FORGET_PASSWORD} exact component={ForgotPassword} />
              <Route path={ROUTE.PRIVACY_POLICY} exact component={PrivacyPolicy} />
              <Route path={ROUTE.TERMS_CONDITIONS} exact component={TermsConditions}/>
              <Route path={ROUTE.CREATE_CALENDAR} exact component={CreateCalendar}/>
              <Route path={ROUTE.CREATE_EVENT} exact component={CreateEvent}/>
              <Route path={ROUTE.EVENT_DETAILS} exact component={EventDetails}/>
              <Route path={ROUTE.ADD_FRIEND} exact component={AddFriends}/>
              <Route path={ROUTE.EDIT_EVENT} exact component={EditEvent}/>
              <Route path={ROUTE.CHECKOUT} exact component={Checkout}/>

          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default withAuthentication(App);