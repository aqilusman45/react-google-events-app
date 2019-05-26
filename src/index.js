import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import * as serviceWorker from "./serviceWorker";
import { Calendar, CalendarContext } from "./component/Calendar_Functions";
import Firebase, { FirebaseContext } from "./component/Firebase";
import { Provider } from "react-redux";
import { CreateStore } from "./store";

ReactDOM.render(
  <CalendarContext.Provider value={new Calendar()}>
    <FirebaseContext.Provider value={new Firebase()}>
      <Provider store={CreateStore}>
        <App />
      </Provider>
    </FirebaseContext.Provider>
  </CalendarContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
