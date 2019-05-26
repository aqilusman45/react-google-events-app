class Calendar {
  constructor() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: "AIzaSyDcRxgHSm2yAIVoqQ6XSYbcY07iGQCyB9I",
          clientId:
            "539777255083-vn14d9qvbuvnh1t4bhufut7k02eaugop.apps.googleusercontent.com",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
          ],
          scope: "https://www.googleapis.com/auth/calendar"
        })
        .then(() => {
          console.log("Gapi Initialize");
        })
        .catch(() => {
          console.log("Error");
        });
    });
    this.calender = window.gapi;
  }

  doSignIn = () => this.calender.auth2.getAuthInstance().signIn();

  getCurrentUser = () =>
    this.calender.auth2.getAuthInstance().currentUser.get();

  verifySignedIn = () => this.calender.auth2.getAuthInstance().isSignedIn.get();

  doSignOut = () => this.calender.auth2.getAuthInstance().signOut();

  checkCalendar = calendarId =>
    this.calender.client.calendar.calendars.get(calendarId);

  addCalendar = resource =>
    this.calender.client.calendar.calendars.insert(resource);

  addEvent = (event) =>
    this.calender.client.calendar.events.insert(event);


  patchHangout = (event) => this.calender.client.calendar.events.patch(event);

  updateEvent = (updatedEvent) =>
    this.calender.client.calendar.events.update(updatedEvent);

  deleteEvent = (calendarId, eventId) =>
    this.calender.client.calendar.events.delete({ calendarId, eventId });

  getEvents = eventParam =>
    this.calender.client.calendar.events.list(eventParam);
}

export { Calendar };
