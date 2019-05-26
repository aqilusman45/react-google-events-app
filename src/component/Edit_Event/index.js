import React, { Component } from "react";
import { SubIntro } from "../Sub_Intro";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { withAuthorization } from "../Session";
import { withCalendar } from "../Calendar_Functions";
import { compose } from "recompose";
import { EditEventForm } from "../Edit_Event_Form";
import * as ROUTES from "../../constants/routes";
import moment from "moment";
import { FriendList } from "../Friends_List";
import { connect } from "react-redux";

const INITIAL_STATE = {
  friends: [],
  address: '',
  uid: "",
  calendarId: "",
  summary: "",
  startDate: "",
  endDate: "",
  location: "",
  eventId: "",
  description: "",
  attendeeEmail: "",
  attendees: [],
  conferenceDataVersion: 1,
  conferenceData: {
    conferenceSolution: {
      key: "eventHangout"
    }
  }
};

class EditEventBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentWillMount() {
    var uid = this.props.firebase.getUser();
    this.setState({
      uid
    });
    this.props.firebase
      .getCalendarId(uid)
      .then(doc => {
        if (doc.data().calendarId === "") {
          this.setState({
            error: "Not Found"
          });
        } else {
          this.setState({
            calendarId: doc.data().calendarId,
            friends: doc.data().friends
          });
        }
      })
      .then(() => {
        const eventDetails = this.props.location.state.event;
        let { attendees } = this.state;
        attendees = eventDetails.attendees ? eventDetails.attendees : [];
      
        this.setState({
          summary: eventDetails.summary,
          startDate: new Date( eventDetails.start.dateTime),
          endDate: new Date(eventDetails.end.dateTime),
          location: eventDetails.location,
          description: eventDetails.description,
          attendees,
          eventId: eventDetails.id
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error
        });
      });
  }

  handleStartDate = date =>{
    this.setState({
      startDate: date
    })
  }

  handleEndDate = date =>{
    this.setState({
      endDate: date
    })
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        address: nextProps.address
      });      
  }

  onSubmit = event => {
    event.preventDefault();
    const {
      calendarId,
      summary,
      startDate,
      address,
      endDate,
      eventId,
      location,
      description,
      attendees
    } = this.state;
    const upDateAddress = address ? `${address.street} ${address.district} 
    ${address.city} ${address.district} ${address.county}  ${address.state}  ${address.postalCode}`.replace(/undefined/g," "):
    location;

    const dateStarting = startDate.toISOString()
    const dateEnding = endDate.toISOString()



    this.props.gapi
      .updateEvent({
        calendarId: calendarId,
        eventId: eventId,
        resource: {
          location: upDateAddress,
          summary: summary,
          description: description,
          sendUpdates: "all",
          sendNotifications: true,
          end: {
            dateTime: moment(dateEnding).format()
          },
          start: {
            dateTime: moment(dateStarting).format()
          },
          reminders: {
            useDefault: "useDefault",
            overrides: [
              {
                method: "email",
                minutes: "10"
              }
            ]
          },
          attendees: attendees
        }
      })
      .then(sucess => {
        this.setState({
          sucess
        })
      })
      .then(() => {
        this.props.history.push(ROUTES.EVENTS);
      })
      .catch(rej => {
        console.log(rej.result.error.message);
        this.setState({
          error: rej.result.error.message
        });
      });
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addEmail = (event, index) => {
    event.preventDefault();
    const { attendees, friends } = this.state;
    attendees.push({ email: friends[index].email, required: true });

    this.setState({
      attendees
    });
  };

  removeEmail = (event, index) => {
    event.preventDefault();
    const { attendees } = this.state;
    attendees.splice(index, 1);
    this.setState({
      attendees
    });
  };

  // editEvent =(event)=>{
  //   event.preventDefault();
  //   this.props.history.push(ROUTES.)
  // }

  render() {
    if (this.props.location.state === undefined) {
      this.props.history.push(ROUTES.EVENTS);
      return null;
    } else {
      return (
        <section id="maincontent">
          <SubIntro heading="Edit Event" />
          <div className="container">
            <div className="row">
              <div className="span6">
                <EditEventForm
                  removeEmail={this.removeEmail}
                  formInputs={this.state}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  addEmail={this.addEmail} 
                  handleStartDate={this.handleStartDate}
                  handleEndDate={this.handleEndDate}
                />
              </div>
              <div className="span6">
                <FriendList
                  addEmail={this.addEmail}
                  deleteButton={false}
                  friends={this.state.friends}
                />
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    address: state.AddressReducers.address
  };
};
const condition = authUser => !!authUser;

const EditEventChild = withAuthorization(condition)(EditEventBase);

const EditEventSubChild = compose(
  withRouter,
  withFirebase,
  withCalendar
)(EditEventChild);

const EditEvent = connect(
  mapStateToProps,
  null
)(EditEventSubChild);

export { EditEvent };
