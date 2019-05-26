import React, { Component } from "react";
import { SubIntro } from "../Sub_Intro";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { withAuthorization } from "../Session";
import { withCalendar } from "../Calendar_Functions";
import { compose } from "recompose";
import { EventForm } from "../Event_Form";
import * as ROUTES from "../../constants/routes";
import { FriendList } from "../Friends_List";
import moment from "moment";
import { connect } from "react-redux";

const INITIAL_STATE = {
  friends: [],
  address: {},
  uid: "",
  calendarId: "",
  summary: "",
  startDate: new Date(),
  endDate: new Date(),
  location: "",
  description: "",
  attendeeEmail: "",
  attendees: [],
  error: "",
  conferenceDataVersion: 1,
  conferenceData: {
    conferenceSolution: {
      key: "eventHangout"
    }
  }
};

class CreateEventBase extends Component {
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
            calendarId: doc.data().calendarId
          });
        }
      })
      .then(() => {
        this.props.firebase
          .getFriends(uid)
          .get()
          .then(doc => {
            const friends = doc.data().friends;
            this.setState({
              friends
            });
          })
          .catch(error => {
            console.log(error);
            this.setState({
              error
            });
          });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error
        });
      });
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
      address,
      startDate,
      endDate,
      description,
      attendees
    } = this.state;

    // const addresstoadd = `${address.street} ${address.district} ${
    //   address.city
    // } ${address.district} 
    // ${address.county}  ${address.state}  ${address.postalCode}  `.replace(
    //   /undefined/g,
    //   ""
    // );

    const addresstoadd = `
    ${address.houseNumber}
    ${address.street}
    ${address.district}
    ${address.city} 
    ${address.county}  
    ${address.state}  
    ${address.postalCode}  `.replace(
     /undefined/g,
     ""
   );

    const requestId = Math.floor((Math.random() * 1000) + 1);
    const dateStarting = startDate.toISOString()
    const dateEnding = endDate.toISOString()
    this.props.gapi
      .addEvent({
        calendarId: calendarId,
        conferenceDataVersion: 1,
        sendUpdates: "all",
        sendNotifications: true,
        resource: {
          location: addresstoadd,
          summary: summary,
          description: description,
          conferenceData: {
            createRequest: { requestId: requestId }
          }, 
          end: {
            dateTime: moment(dateEnding).format(),
          },
          start: {
            dateTime: moment(dateStarting).format(),
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
      .then(res => {
        this.setState({
          attendees: [],
        }, ()=>{
          this.props.history.push(ROUTES.EVENTS);
        })
      })
      .catch(rej => {
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
    return (
      <section id="maincontent">
        <SubIntro heading="Events" />
        <div className="container">
          <div className="row-fluid">
            <div className="span6">
              <EventForm
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

const mapStateToProps = state => {
  return {
    address: state.AddressReducers.address
  };
};
const condition = authUser => !!authUser;

const CreateEventsChild = withAuthorization(condition)(CreateEventBase);

const CreateEventSubChild = compose(
  withRouter,
  withFirebase,
  withCalendar
)(CreateEventsChild);

const CreateEvent = connect(
  mapStateToProps,
  null
)(CreateEventSubChild);

export { CreateEvent };
