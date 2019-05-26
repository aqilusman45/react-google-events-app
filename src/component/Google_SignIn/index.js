import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { withCalendar } from "../Calendar_Functions";


const INITIAL_STATE = {
  username: "",
  friends: [],
  email: "",
  uid: "",
  error: ""
};

class GoogleLoginParent extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.gapi
      .doSignIn()
      .then(() => {
        var isSignedIn = this.props.gapi.verifySignedIn();
        if (isSignedIn) {
          var googleUser = this.props.gapi.getCurrentUser();
          var idToken = googleUser.getAuthResponse().id_token;
          var creds = this.props.firebase.googleProvider.credential(idToken);
        }
        this.props.firebase.doSignInWithCredentials(creds).then(authUser => {
          const uid = authUser.user.uid;
          return this.props.firebase
            .users(uid)
            .set(
              {
                username: authUser.user.displayName,
                email: authUser.additionalUserInfo.profile.email,
                uid
              },
              { merge: true }
            )
            .then(() => {
              this.props.firebase
                .getFriends(authUser.user.uid)
                .get()
                .then(doc => {
                  const friends = doc.data().friends;
                  if (friends === undefined) {
                    this.props.firebase.users(authUser.user.uid).set(
                      {
                        friends: []
                      },
                      { merge: true }
                    );
                  } else {
                    this.setState({
                      friends
                    });
                  }
                })
                .then(() => {
                  const { friends } = this.state;
                  if (friends.length === 0 || this.props.location.pathname === ROUTES.EVENTS) {
                    this.props.history.push(ROUTES.ADD_FRIEND, {
                      addPrompt: "Start from adding a Friend"
                    });
                  } else {
                    this.props.history.push(ROUTES.EVENTS);
                  }
                });
            })
            .catch(error => {
              console.log(error);
              this.setState({
                error
              });
            });
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div>
          <button onClick={this.onSubmit} className="google facebook-login">
        {/* <img src={process.env.PUBLIC_URL + '/assets/images/google.png'} alt="" /> */}
        <i className="icon-google-plus"></i> Login with Google
          </button>
        {error && <p>{error.message}</p>}
      </div>
    );
  }
}

const GoogleLoginChild = withCalendar(GoogleLoginParent);

const GoogleLogin = compose(
  withRouter,
  withFirebase
)(GoogleLoginChild);

export { GoogleLogin };
