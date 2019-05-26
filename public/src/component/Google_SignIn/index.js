import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { withCalendar } from "../Calendar_Functions";

const INITIAL_STATE = {
  username: "",
  address: [],
  email: "",
  uid: "",
  error: "",
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
      .then( () => {
        var isSignedIn = this.props.gapi.verifySignedIn();
        if (isSignedIn) {
          var googleUser = this.props.gapi.getCurrentUser();
          var idToken = googleUser.getAuthResponse().id_token;
          var creds = this.props.firebase.googleProvider.credential(
            idToken
          )}
          this.props.firebase.doSignInWithCredentials(creds)
          .then(authUser => {
            const { address } = this.state;
            const uid = authUser.user.uid;
            return this.props.firebase.users(uid).set(
              {
                username: authUser.user.displayName,
                email: authUser.additionalUserInfo.profile.email,
                uid,
                address, 
              },
              { merge: true }
            );
          })
          .then(()=>{
          this.setState({
            ...INITIAL_STATE
          })
          this.props.history.push(ROUTES.DASHBOARD)})
      })
      .catch(error => {
        this.setState({ error });
      });
  };


  render() {
    const { error } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <button className="btn btn-default">Sign In With Google</button>
        </form>
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
