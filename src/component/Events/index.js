import React, { Component } from "react";
import { SubIntro } from "../Sub_Intro";
import { withFirebase } from "../Firebase";
import { EventList } from "../Event_List";
import { withRouter } from "react-router-dom";
import { withAuthorization } from "../Session";
import { withCalendar } from "../Calendar_Functions";
import { compose } from "recompose";
import { CreateCalendarRedirect } from "../Creat_Calendar_Link";
import { GoogleLogin } from "../Google_SignIn";
import { CreateEventRedirect } from "../Create_Event_Link";
import * as ROUTES from "../../constants/routes";


const INITIAL_STATE = {
  events: [],
  calendarId: "",
  error: ""
};

// const CALENDAR_NOT_FOUND = "No Calendar Found";
const CALENDAR_NOT_CREATED = "Please create a new Calendar to add an Event";
const GOOGLE_NOT_AUTH =
  "Please Login With Google To Add and See Calendar Events";

function RenderConditions(
  error,
  events,
  viewDetails,
  deleteEvent,
  editEvent,
  orderParty
) {
  switch (error) {
    case CALENDAR_NOT_CREATED:
      return (
        <div>
          <p>{error}</p>
          <CreateCalendarRedirect />
        </div>
      );
    case GOOGLE_NOT_AUTH:
      return (
        <div>
          <p>{error}</p>
          <GoogleLogin />
        </div>
      );
    case "":
      return (
        <div>
          <CreateEventRedirect />
          <EventList
            viewDetails={viewDetails}
            orderParty={orderParty}
            editEvent={editEvent}
            events={events}
            deleteEvent={deleteEvent}
          />
        </div>
      );
    default:
      return null;
  }
}

class EventsBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  componentDidMount() {
    if (this.props.gapi.getCurrentUser().isSignedIn()) {
      if (this.props.firebase.getUser()) {
        this.props.firebase
          .getCalendarId(this.props.firebase.getUser())
          .then(doc => {
            if (doc.data().calendarId === "") {
              this.setState({
                error: CALENDAR_NOT_CREATED
              });
            } else {

              const uid = this.props.firebase.getUser();
              this.props.firebase
                .getFriends(uid)
                .get()
                .then(doc => {
                  const friends = doc.data().friends;
                  if (friends.length === 0 ) {
                    this.props.history.push(ROUTES.ADD_FRIEND, {addPrompt : 'Please add a friend or two before you can create and event'})
                  } 
                })
                .catch(error => {
                  console.log(error);
                  // this.setState({
                  //   error
                  // })
                });


              this.setState(
                {
                  calendarId: doc.data().calendarId
                },
                () => {
                  if (this.state.calendarId !== "") {
                    this.props.gapi
                      .getEvents({
                        calendarId: this.state.calendarId
                      })
                      .then(res => {
                        this.setState({
                          events: res.result.items
                        });
                      })
                      .catch(rej => {
                        this.setState({
                          error: CALENDAR_NOT_CREATED
                        });
                      });
                  }
                }
              );
            }
          })
          .catch(error => {
            this.setState({
              error
            });
          });
      }
    } else {
      this.setState({
        error: GOOGLE_NOT_AUTH
      });
    }
  }

  viewDetails = index => {
    const { events, calendarId } = this.state;
    this.props.history.push(ROUTES.EVENT_DETAILS, {
      events: events[index],
      calendarId: calendarId
    });
  };

  deleteEvent = index => {
    const { calendarId } = this.state;
    const eventId = this.state.events[index].id;
    this.props.gapi
      .deleteEvent(calendarId, eventId)
      .then(res => {
        const event = this.state.events.splice(index, 1);
        this.setState({
          event
        });
      })
      .catch(rej => {
        console.log(rej);
      });
  };

  editEvent = index => {
    const { events } = this.state;
    this.props.history.push(ROUTES.EDIT_EVENT, { event: events[index] });
  };

  orderParty = index => {
    const { events } = this.state;
    this.props.history.push(ROUTES.CHECKOUT, { event: events[index] });
  };

  render() {
    const { error, events } = this.state;
    return (
      <section id="maincontent">
        <SubIntro heading="Events" />
        <div className="container">
          <div className="Row">
            <div className="span11">
              {RenderConditions(
                error,
                events,
                this.viewDetails,
                this.deleteEvent,
                this.editEvent,
                this.orderParty
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const condition = authUser => !!authUser;

const EventsChild = withAuthorization(condition)(EventsBase);

const Events = compose(
  withRouter,
  withFirebase,
  withCalendar
)(EventsChild);

export { Events };
