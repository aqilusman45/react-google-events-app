import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { CalendarForm } from "../Calendar_Form";
import { SubIntro } from "../Sub_Intro";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { withCalendar } from "../Calendar_Functions";

const INITIAL_STATE = {
  kind: "calendar#calendar",
  summary: "",
  description: "",
  conferenceProperties: {
    allowedConferenceSolutionTypes: ["eventHangout"]
  },
  calendarId: "",
  error: ""
};

class CreateCaldendarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    const uid = this.props.firebase.auth.currentUser.uid;
    const { kind, summary, description, conferenceProperties } = this.state;
    this.props.gapi
      .addCalendar({
        kind,
        summary,
        description,
        conferenceProperties
      })
      .then(res => {
        this.setState({ calendarId: res.result.id });
      })
      .then(() => {
        const { calendarId } = this.state;
        this.props.firebase
          .setCalendarId(uid)
          .set({
            calendarId
          },{merge:true})
      })
      .then(()=>{
        this.setState({...INITIAL_STATE});
        this.props.history.push(ROUTES.EVENTS);
      })
      .catch(rej => {
        console.log(rej);
      });
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <section id="maincontent">
        <SubIntro heading="Create Calendar" />
        <div className="container">
          <div className="row-fluid">
            <div className="span12">
              <CalendarForm
                formInputs={this.state}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const condition = authUser => !!authUser;

const CreateCaldendarChild = withAuthorization(condition)(
  CreateCaldendarComponent
);

const CreateCalendar = compose(
  withRouter,
  withFirebase,
  withCalendar
)(CreateCaldendarChild);

export { CreateCalendar };
