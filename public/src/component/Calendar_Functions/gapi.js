class Calendar {
  constructor() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: "AIzaSyDXg9uLybzxCvJMpDYY0mMRv5-JwqVPNE8",
          clientId:
            "462735538451-6lfc9j15dbhhrl15pi84gu1lp4mnuag9.apps.googleusercontent.com",
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
