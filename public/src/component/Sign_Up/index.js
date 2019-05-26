import React from "react";
import { SignUpForm } from "../Sign_Up_Form";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { connect } from "react-redux";
import { SubIntro } from "../Sub_Intro";
const INITIAL_STATE = {
  username: "",
  email: "",
  uid: "",
  calendarId: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
  address: {}
};

class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      address: nextProps.address
    });
  }

  onSubmit = event => {
    event.preventDefault();
    const { email, passwordOne, username, address, calendarId } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        
        const Address = `${address.street} ${address.district} ${address.city} ${address.district} 
        ${address.county}  ${address.state}  ${address.postalCode}  `.replace(/undefined/g, ''); 
    

        const uid = authUser.user.uid;
        this.props.firebase.users(uid).set(
          {
            username,
            email,
            uid,
            calendarId,
            address: Address,
          },
          { merge: true }
        );
        return authUser;
      })
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
        <SubIntro heading="Sign Up" />
        <div className="container">
          <div className="row-fluid">
            <div className="span12">
              <SignUpForm
                formInputs={this.state}
                onChange={this.onChange}
                address={this.addressListener}
                onSubmit={this.onSubmit}
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

const SignUp = connect(
  mapStateToProps,
  null
)(withRouter(withFirebase(SignUpComponent)));

export { SignUp };
