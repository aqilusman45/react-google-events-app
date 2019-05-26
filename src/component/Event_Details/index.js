import React, { Component } from "react";
import { SubIntro } from "../Sub_Intro";
import { withAuthorization } from "../Session";
import { withCalendar } from "../Calendar_Functions";
import moment from "moment";
import * as ROUTES from "../../constants/routes";

// const  = ({ location, history, gapi }) => {

const INTITIAL_STATE = {
  requestId: "",
  success: "",
  error: ""
};

// var eventPatch = ;

class EventDetailsBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INTITIAL_STATE };
  }

  addHangout = (event) => {
    event.preventDefault();
    const calendarId = this.props.location.state.calendarId;
    const eventId = this.props.location.state.events.id;
    const { requestId } = this.state;
    this.props.gapi
      .patchHangout({
        calendarId: calendarId,
        eventId: eventId,
        resource: {
          conferenceData: {
            createRequest: { requestId: requestId }
          }
        },
        sendNotifications: true,
        conferenceDataVersion: 1
      })
      .then(res => {
        this.setState({
          success: "Hangout added to Event, Open Calendar to Initiate Call",
          requestId: ""
        });
      })
      .then(() => {
        setTimeout(() => {
          this.setState({
            success: ""
          });
        }, 3000);
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    if (this.props.location.state === undefined) {
      this.props.history.push(ROUTES.EVENTS);
      return null;
    } else {
      const state = this.props.location.state.events;
      return (
        <section id="maincontent">
          <SubIntro heading={state.summary} />
          <div className="container">
            <div className="row">
              <div className="span11">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Attendees</th>
                      <th>Location</th>
                      <th>Creator</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {state.attendees
                          ? state.attendees.map((item, index) => (
                              <p key={index}>{item.email}</p>
                            ))
                          : null}
                      </td>
                      <td>{state.location}</td>
                      <td>{state.creator.email}</td>
                    </tr>
                    <tr>
                      <th>Start / End Date</th>
                      <th>Calendar Name</th>
                      <th>Calendar Description</th>
                    </tr>
                    <tr>
                      <td>
                        {moment(state.start.dateTime).format('MMMM Do YYYY, h:mm:ss a')} / { moment(state.end.dateTime).format('MMMM Do YYYY, h:mm:ss a')}
                      </td>
                      <td>{state.organizer.displayName}</td>
                      <td>{state.description}</td>
                    </tr>
                    <tr>
                      <td />
                      <td>
                        <form
                          onSubmit={this.addHangout}
                        >
                          <label>Set Passcode for users to join Hangouts Call</label>
                          <input
                            type="text"
                            name="requestId"
                            required
                            value={this.state.requestId}
                            onChange={this.onChange}
                          />
                          <div>
                            <button className="btn btn-outline-secondary">
                              Add Hangouts in Event
                            </button>
                          </div>
                        </form>
                      </td>
                      <td>
                        <a
                          href={state.htmlLink}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <button className="btn btn-outline-secondary">
                            View in Google Calendar
                          </button>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {this.state.success && <p>{this.state.success}</p>}
                {this.state.error && <p>{this.state.error}</p>}
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
}

const condition = authUser => !!authUser;

export const EventDetails = withAuthorization(condition)(
  withCalendar(EventDetailsBase)
);
