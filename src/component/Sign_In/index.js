import React from "react";
import { SignInForm } from "../Sign_In_Form";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { SubIntro } from "../Sub_Intro";
import './styles.css'



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
        this.props.history.push(ROUTES.EVENTS);
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
      <div className="container-fluid">
        <div className="form-container">
               <div className="login-wrapper">
               <SignInForm
                  formInputs={this.state}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                />
               </div>
        </div>
      </div>
      </section>
    );
  }
}

const SignIn = withRouter(withFirebase(SignInComponent));

export { SignIn };
