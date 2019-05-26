import React from "react";
import { SignInForm } from "../Sign_In_Form";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { GoogleLogin } from "../Google_SignIn";
import * as ROUTES from "../../constants/routes";
import { FacebookLogin } from "../Facebook_SignIn";
import { SubIntro } from "../Sub_Intro";
const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          ...INITIAL_STATE
        });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <section id="maincontent">
      <SubIntro heading="Sign In"/>
        <div className="container">
          <div className="row">
            <div className="span4 offset4">
              <div className="row-fluid">
                <SignInForm
                  formInputs={this.state}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                />
              </div>
              <div className="text-center">
                <GoogleLogin />
                <FacebookLogin />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const SignIn = withRouter(withFirebase(SignInComponent));

export { SignIn };
